package dao

import com.microsoft.azure.documentdb.{ConnectionPolicy, ConsistencyLevel, DocumentClient}

/**
  * Created by kirankumarbs on 12/2/17.
  */
object DBConfigFactory{
    def getHOST = "https://bfr.documents.azure.com:443/";
    def masterKey = "f30a6cDRHXlNUbX4dZWg0fqqYND6IYreRkolc7wGAirogsM2mZ17LvksR4Q6YaJ0OiKOMO4tRnGgzOLgpJWWzw==";
    def databaseId = "thewall"
    def collectionId = "tyrion"
  def collectionId1 = "reek"
    def documentClient =
      new DocumentClient(getHOST,
      masterKey, ConnectionPolicy.GetDefault(),
      ConsistencyLevel.Session)
}
