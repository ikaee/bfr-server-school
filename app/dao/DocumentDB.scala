package dao

import java.text.SimpleDateFormat
import java.time.LocalDate
import java.time.temporal.ChronoUnit
import java.util.{Date, TimeZone}

import com.microsoft.azure.documentdb.{Document, DocumentClient}
import dao.DBConfigFactory._
import model.{AMRData, HotCookedData, THRData}
import play.api.libs.json._

import scala.collection.JavaConverters._


/**
  * Created by kirankumarbs on 4/6/17.
  */
object DocumentDB {
  val simpleDateFormat = new SimpleDateFormat("dd-MM-yyyy")
  simpleDateFormat.setTimeZone(TimeZone.getTimeZone("IST"))

  def studentImage(schoolCode: String, studentCode: String): String = {
    val imageData = queryDatabase(client, "SELECT * FROM coll where coll.doctype = \"image\" and coll.schoolcode = \"" + schoolCode + "\" and coll.studentcode = \"" + studentCode + "\"").toList match {
      case Nil => ""
      case xs => xs.head.get("image").toString
    }
    imageData
  }

  def getTHR(schoolCode: String) = {
    val currentDate: String = simpleDateFormat.format(new Date())
    val master = queryDatabase(client, "SELECT * FROM coll where coll.doctype = \"registration\" and coll.schoolcode = \"" + schoolCode + "\"").toList match {
      case Nil => Nil
      case xs => xs
    }
    println("Master Data is ===>" + master)

    val present = queryDatabase(client, "SELECT * FROM coll where coll.doctype = \"thr\" and coll.schoolcode = \"" + schoolCode + "\" and coll.datestamp = \"" + currentDate + "\"").toList match {
      case Nil => Nil
      case xs => xs
    }
    println("Present Data is ===>" + present)

    implicit def convert(o: Object): String = o.toString()


    val thrs = present.map(p => master.find(m => m.get("studentcode") == p.get("studentcode")) match {
      case None => None
      case Some(m) =>
        Some(THRData(m.get("schoolcode"), m.get("studentcode"), m.get("name"), m.get("surname"), m.get("gender"), m.get("dob"), p.get("datestamp")))
    })

    thrs match {
      case Nil => Nil
      case xs => xs.filter(_.isDefined).map(_.get)
    }

  }


  def getAMR(schoolCode: String) = {
    val currentDate: String = simpleDateFormat.format(new Date())
    val master = queryDatabase(client, "SELECT * FROM coll where coll.doctype = \"registration\" and coll.schoolcode = \"" + schoolCode + "\"").toList match {
      case Nil => Nil
      case xs => xs
    }
    println("Master Data is ===>" + master)

    val present = queryDatabase(client, "SELECT * FROM coll where coll.doctype = \"attendance\" and coll.schoolcode = \"" + schoolCode + "\" and coll.datestamp = \"" + currentDate + "\"").toList match {
      case Nil => Nil
      case xs => xs
    }
    println("Present Data is ===>" + present)

    implicit def convert(o: Object): String = o.toString()


    val amrs = present.map(p => master.find(m => m.get("studentcode") == p.get("studentcode")) match {
      case None => None
      case Some(m) =>
        Some(AMRData(m.get("schoolcode"), m.get("studentcode"), m.get("name"), m.get("surname"), m.get("gender"), m.get("dob"), p.get("datestamp")))
    })

    amrs match {
      case Nil => Nil
      case xs => xs.filter(_.isDefined).map(_.get)
    }

  }

  def getHotCooked(schoolCode: String) = {
    val currentDate: String = simpleDateFormat.format(new Date())
    val master = queryDatabase(client, "SELECT * FROM coll where coll.doctype = \"registration\" and coll.schoolcode = \"" + schoolCode + "\"").toList match {
      case Nil => Nil
      case xs => xs
    }
    println("Master Data is ===>" + master)

    val present = queryDatabase(client, "SELECT * FROM coll where coll.doctype = \"hot-cooked\" and coll.schoolcode = \"" + schoolCode + "\" and coll.datestamp = \"" + currentDate + "\"").toList match {
      case Nil => Nil
      case xs => xs
    }
    println("Present Data is ===>" + present)

    implicit def convert(o: Object): String = o.toString()


    val hotCooked = present.map(p => master.find(m => m.get("studentcode") == p.get("studentcode")) match {
      case None => None
      case Some(m) =>
        Some(HotCookedData(m.get("schoolcode"), m.get("studentcode"), m.get("name"), m.get("surname"), m.get("gender"), m.get("dob"), p.get("datestamp")))
    })

    hotCooked match {
      case Nil => Nil
      case xs => xs.filter(_.isDefined).map(_.get)
    }

  }

  type DashboardData = Either[List[String], Map[String, String]]

  val client = DBConfigFactory.documentClient

  def dashboardData(filters: Option[Map[String, String]],dashboardType:String): DashboardData = {
    val master: List[Document] = totalRegistrations
    val present: List[Document] = totalPresented(dashboardType)
    val attendanceWiseData: Map[String, String] = attendancData(master.length, present.length)
    val genderWiseData: Map[String, String] = genderData(master, present)
    val monthWiseData: Map[String, String] = monthData(present)
    val ageWiseData: Map[String, String] = ageData(present, master)

    Right(attendanceWiseData ++ genderWiseData ++ monthWiseData ++ ageWiseData)

  }

  def monthData(present: List[Document]) = {
    present.groupBy(d => d.get("datestamp").toString.split("-")(1)).map(m => (m._1, m._2.size.toString))
  }

  private def genderData(total: List[Document], present: List[Document]): Map[String, String] = {
    val genderData = total.filter(d => present.exists(d1 => d.get("studentcode") == d1.get("studentcode") && d.get("schoolcode") == d1.get("schoolcode")))
      .groupBy(d => d.get("gender"))
      .map(g => (g._1.toString.toLowerCase(), if(g._2.size == 0)  "0" else  ((g._2.size.toDouble / present.size) * 100).toString))

    genderData

  }

  private def totalPresented(dashboardType:String) = {
    val currentDate: String = simpleDateFormat.format(new Date())
    val query = "SELECT * FROM coll where coll.doctype = \""+dashboardType+"\" and coll.datestamp = \"" + currentDate + "\"";
    queryDatabase(client, query).toList match {
      case Nil => Nil
      case xs => xs
    }

  }

  private def totalRegistrations = {

    val query = "SELECT * FROM coll where coll.doctype = \"registration\""
    queryDatabase(client, query).toList match {
      case Nil => Nil
      case xs => xs
    }

  }

  private def attendancData(total: Int, present: Int) = {

    val percentage = total match {
      case 0 => 0
      case total => (present * 100) / total
    }

    Map("total" -> s"$total", "present" -> s"$present", "percentage" -> s"$percentage")
  }

  private def ageData(present: List[Document], master: List[Document]): Map[String, String] = {
    val presentMasterData: List[Document] =
      master.filter(m => present.exists(p => p.get("studentcode") == m.get("studentcode")))

    def getAgeGroup(dob: String): String = {
      val dobParams = dob.split("-")
      val start = LocalDate.of(dobParams(2).toInt, dobParams(1).toInt, dobParams(0).toInt)
      val end = LocalDate.now()
      val year = Math.abs(ChronoUnit.YEARS.between(start, end))

      year match {
        case y if (y > 5 && y < 9) => "6-8"
        case y if (y > 8 && y < 12) => "9-11"
        case y if (y > 12 && y < 14) => "12-13"
        case y if (y > 14) => "14+"
        case _ => ""

      }

    }

    presentMasterData.map(d => getAgeGroup(d.get("dob").toString()))
      .groupBy(identity).map(a => (a._1, a._2.size.toString))

  }

  private def queryDatabase(client: DocumentClient, query: String) = {
    client.queryDocuments(s"dbs/$databaseId/colls/$collectionId",
      query, null)
      .getQueryIterable.asScala
  }


  def insertIntoDB(data: JsValue): String = {
    val client = DBConfigFactory.documentClient
    client.createDocument(s"dbs/$databaseId/colls/$collectionId",
      new Document(data.toString()), null, false)
    "record is inserted"
  }

  def insertAttendanceEntry(data: JsValue): String = {
    val client = DBConfigFactory.documentClient
    client.createDocument(s"dbs/$databaseId/colls/$collectionId",
      new Document(data.toString()), null, false)
    "record is inserted"
  }

}
