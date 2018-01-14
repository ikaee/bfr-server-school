import org.junit.Test

import dao.DBConfigFactory._

class test {

  @Test
  def itShouldMasterData(): Unit = {
    val dashboard = documentClient.queryDocuments(
      "dbs/" + databaseId + "/colls/" + collectionId,
      "SELECT * FROM tyrion where tyrion.doctype=\"attendance\" ",
      null).getQueryIterable().toList()

    println("master data ===>" + dashboard)

  }

}
