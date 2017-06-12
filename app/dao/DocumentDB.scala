package dao

import java.time.LocalDate
import java.time.temporal.ChronoUnit

import com.google.gson.Gson
import com.microsoft.azure.documentdb.{Document, DocumentClient}
import controllers.Registration
import dao.DBConfigFactory._
import model.AMRData
import play.api.libs.json._

import scala.collection.JavaConverters._


/**
  * Created by kirankumarbs on 4/6/17.
  */
object DocumentDB {
  def getAMR(schoolCode: String) = {
    val master = queryDatabase(client, "SELECT * FROM coll where coll.doctype = \"registration\" and coll.schoolcode = \""+schoolCode+"\"").toList match {
      case Nil => Nil
      case xs => xs
    }
    println("Master Data is ===>"+ master)

    val present = queryDatabase(client, "SELECT * FROM coll where coll.doctype = \"attendance\" and coll.schoolcode = \""+schoolCode+"\"").toList match {
      case Nil => Nil
      case xs => xs
    }
    println("Present Data is ===>"+ present)

    implicit def convert(o: Object): String = o.toString()


    var amrs = present.map(p => master.find(m => m.get("studentcode") == p.get("studentcode")) match {
      case None => None
      case Some(m) =>
        Some(AMRData(m.get("studentcode"), m.get("name"),m.get("surname"), m.get("gender"), m.get("dob"), p.get("datestamp")))
    })

    amrs match {
      case Nil => Nil
      case xs => xs.filter(_.isDefined).map(_.get)
    }

  }

  type DashboardData = Either[List[String], Map[String, String]]
  val client = DBConfigFactory.documentClient

  def dashboardData(filters: Option[Map[String, String]]): DashboardData =
    {
      val master: List[Document] = totalRegistrations
      val present: List[Document] = totalPresented
      val attendanceWiseData: Map[String, String] = attendancData(master.length, present.length)
      val genderWiseData: Map[String, String] = genderData(master, present)
      val monthWiseData: Map[String, String] = monthData(present)
      val ageWiseData: Map[String, String] = ageData(present, master)

      Right(attendanceWiseData ++ genderWiseData ++ monthWiseData ++ ageWiseData)

    }

  def monthData(present: List[Document]) = {
    present.groupBy(d => d.get("datestamp").toString.split("-")(1)).map(m => (m._1, m._2.size.toString))
  }

  private def genderData(total: List[Document], present: List[Document]) = {
    total.filter(d => present.exists(d1 => d.get("studentcode") == d1.get("studentcode")))
      .groupBy(d => d.get("gender"))
      .map(g => (g._1.toString.toLowerCase(), g._2.size.toString))

  }

  private def totalPresented = {

    val query = "SELECT * FROM coll where coll.doctype = \"attendance\""
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
    val percentage = (present * 100) / total

    Map("total" -> s"$total", "present" -> s"$present", "percentage" -> s"$percentage")
  }

  private def ageData(present: List[Document], master: List[Document]): Map[String, String] = {
    val presentMasterData: List[Document] =
      master.filter(m => present.exists(p => p.get("studentcode") == m.get("studentcode")))

    def getAgeGroup(dob: String): String = {
      val dobParams = dob.split("-")
      println(dob)
      val start = LocalDate.of(dobParams(2).toInt, dobParams(1).toInt, dobParams(0).toInt)
      val end = LocalDate.now()
      val year = Math.abs(ChronoUnit.YEARS.between(start, end))

      year match {
        case y if(y >5 && y<9) => "6-8"
        case y if(y >8 && y<12) => "9-11"
        case y if(y >12 && y<14) => "12-13"
        case y if(y >14 ) => "14+"
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

  def insertFormRegistration(registration: Registration) = {
    val json = new Gson().toJson(registration)
    val client = DBConfigFactory.documentClient
    client.createDocument(s"dbs/$databaseId/colls/$collectionId",
      new Document(json), null,false)
    "record is inserted"
  }

  def insertAttendanceEntry(data: JsValue): String = {
    val client = DBConfigFactory.documentClient
    client.createDocument(s"dbs/$databaseId/colls/$collectionId",
      new Document(data.toString()), null,false)
    "record is inserted"
  }

}
