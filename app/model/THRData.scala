package model

import dao.DocumentDB
import play.api.libs.json.{Json, Writes}

case class THRData(schoolCode: String,
                   studentcode: String,
                   name: String,
                   surname: String,
                   gender: String,
                   dob: String,
                   thr: String)

object THRData {
  def apply(schoolCode: String): List[THRData] = {
    DocumentDB.getTHR(schoolCode)
  }

  implicit val thrDataWriter: Writes[THRData] = new Writes[THRData] {
    override def writes(a: THRData) = Json.obj(
      "schoolcode" -> a.schoolCode,
      "studentcode" -> a.studentcode,
      "name" -> a.name,
      "surname" -> a.surname,
      "gender" -> a.gender,
      "dob" -> a.dob,
      "thr" -> a.thr
    )
  }
}