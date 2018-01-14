import org.junit.{Ignore, Test}
import dao.DBConfigFactory._

import scala.collection.JavaConverters._

class test {

  @Test
  def itShouldGetMasterData(): Unit = {
    val dashboard = documentClient.queryDocuments(
      "dbs/" + databaseId + "/colls/" + collectionId,
      "SELECT * FROM tyrion where tyrion.doctype=\"attendance\" and tyrion.schoolcode =\"asdf\" ",
      null).getQueryIterable().toList()

    println("master data ===>" + dashboard)

  }

/*  @Test
  def itShouldRemoveSpecificDashboardDocument(): Unit ={

    val documents = documentClient.queryDocuments(
      "dbs/" + databaseId + "/colls/" + collectionId,
      "SELECT * FROM tyrion where tyrion.studentcode=\"abhy\" and tyrion.doctype=\"attendance\" ",
      null).getQueryIterable().asScala.toList

    println(documents)

    documents.foreach(d => {
      documentClient.deleteDocument(d.getSelfLink(), null)
    })

  }*/

}
