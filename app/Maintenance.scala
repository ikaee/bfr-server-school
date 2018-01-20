import dao.DBConfigFactory._
import scala.collection.JavaConverters._

object getAllRegistrationData extends App{
  val dashboard = documentClient.queryDocuments(
    "dbs/" + databaseId + "/colls/" + collectionId,
    "SELECT * FROM tyrion where tyrion.doctype=\"registration\" ",
    null).getQueryIterable().toList()

  println("master data ===>" + dashboard)
}
object getImageData extends App{
  val dashboard = documentClient.queryDocuments(
    "dbs/" + databaseId + "/colls/" + collectionId,
    "SELECT * FROM tyrion where tyrion.doctype=\"image\" ",
    null).getQueryIterable().toList()

  println("master data ===>" + dashboard)
}
object removeAllAttendance extends App{

  val documents = documentClient.queryDocuments(
    "dbs/" + databaseId + "/colls/" + collectionId,
    "SELECT * FROM tyrion where tyrion.doctype=\"attendance\" ",
    null).getQueryIterable().asScala.toList

  println(documents)

  documents.foreach(d => {
    documentClient.deleteDocument(d.getSelfLink(), null)
  })

}
object removeAllRegistration extends App{

  val documents = documentClient.queryDocuments(
    "dbs/" + databaseId + "/colls/" + collectionId,
    "SELECT * FROM tyrion where tyrion.studentcode=\"abhy\" and tyrion.doctype=\"registration\" ",
    null).getQueryIterable().asScala.toList

  println(documents)

  documents.foreach(d => {
    documentClient.deleteDocument(d.getSelfLink(), null)
  })

}
