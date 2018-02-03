package model

import dao.DocumentDB
import play.api.libs.json.{Json, Writes}

case class HotCookedData(schoolCode: String,
                         studentcode: String,
                         name: String,
                         surname: String,
                         gender: String,
                         dob: String,
                         datestamp: String,
                         lattitude:String,
                         longitude:String)

object HotCookedData {
  def apply(schoolCode: String): List[HotCookedData] = {
    DocumentDB.getHotCooked(schoolCode)
  }

  implicit val thrDataWriter: Writes[HotCookedData] = new Writes[HotCookedData] {
    override def writes(a: HotCookedData) = Json.obj(
      "schoolcode" -> a.schoolCode,
      "studentcode" -> a.studentcode,
      "name" -> a.name,
      "surname" -> a.surname,
      "gender" -> a.gender,
      "dob" -> a.dob,
      "datestamp" -> a.datestamp,
      "lattitude" -> a.lattitude,
      "longitude" -> a.longitude
    )
  }
}