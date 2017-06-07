package dao
import scala.collection.JavaConverters._

/**
  * Created by kirankumarbs on 7/6/17.
  */
object temp extends App{

  val documentClient = DBConfigFactory.documentClient

  val documentsDashboard = documentClient.queryDocuments(s"dbs/thewall/colls/tyrion",
    "SELECT * FROM tyrion where tyrion.doctype in (\"registration\",\"attendance\") ",null)
    .getQueryIterable.asScala

  documentsDashboard.foreach(document => {
    documentClient.deleteDocument(document.getSelfLink, null)
  })

}
