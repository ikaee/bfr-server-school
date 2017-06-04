package dao

import com.microsoft.azure.documentdb.{ConnectionPolicy, ConsistencyLevel, DocumentClient}

/**
  * Created by kirankumarbs on 12/2/17.
  */
object DBConfigFactory{
    def getHOST = "https://epgmdbs.documents.azure.com:443/";
    def masterKey = "yBoqCjpYeTprTCI1hUtuyzAvLcqBclbibIHkpntNWC4vs1La2sWGS3ewapSpayGH4syAbdJK35pli89g1rUFZw==";
    def databaseId = "thewall"
    def collectionId = "tyrion"
  def collectionId1 = "reek"
    def documentClient =
      new DocumentClient(getHOST,
      masterKey, ConnectionPolicy.GetDefault(),
      ConsistencyLevel.Session)
}
