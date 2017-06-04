package dao

import com.google.gson.Gson
import com.microsoft.azure.documentdb.Document
import controllers.Registration
import dao.DBConfigFactory._
import play.api.libs.json._


/**
  * Created by kirankumarbs on 4/6/17.
  */
object DocumentDB {
  def insertFormRegistration(registration: Registration) = {
    val json = new Gson().toJson(registration)
    val client = DBConfigFactory.documentClient
    client.createDocument(s"dbs/$databaseId/colls/$collectionId1",
      new Document(json), null,false)
    "record is inserted"
  }

  def insertAttendanceEntry(data: JsValue): String = {
    val client = DBConfigFactory.documentClient
    client.createDocument(s"dbs/$databaseId/colls/$collectionId1",
      new Document(data.toString()), null,false)
    "record is inserted"
  }

}
