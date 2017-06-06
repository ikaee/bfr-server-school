package dao

import com.google.gson.Gson
import com.microsoft.azure.documentdb.{Document, DocumentClient}
import controllers.Registration
import dao.DBConfigFactory._
import play.api.libs.json._

import scala.collection.JavaConverters._


/**
  * Created by kirankumarbs on 4/6/17.
  */
object DocumentDB {
  type DashboardData = Either[List[String], Map[String, String]]
  val client = DBConfigFactory.documentClient
  def dashboardData(filters: Option[Map[String, String]]): DashboardData =
    {
      val total: List[Document] = {
        val query = "SELECT * FROM coll where coll.doctype = \"registration\""
        queryDatabase(client, query).toList match {
          case Nil => Nil
          case xs => xs
        }
      }
      val present = {
        val query = "SELECT * FROM coll where coll.doctype = \"attendance\""
        queryDatabase(client, query).toList match {
          case Nil => Nil
          case xs => xs
        }
      }

      val attendanceWiseData: Map[String, String] = attendancData(total.length, present.length)
      val genderWiseData: Map[String, String] = {

        total.filter(d => present.exists(d1 => d.get("studentcode")==d1.get("studentcode")))
          .groupBy(d => d.get("gender"))
          .map(g => (g._1.toString.toLowerCase(),g._2.size.toString))
      }

      Right(attendanceWiseData ++ genderWiseData)

    }


  private def attendancData(total: Int, present: Int) = {
    val percentage = (present / total) * 100

    Map("total" -> s"$total", "present" -> s"$present", "percentage" -> s"$percentage")
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
