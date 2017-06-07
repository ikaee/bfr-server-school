package model

import dao.DocumentDB
import play.api.libs.json.{Json, Writes}

/**
  * Created by kirankumarbs on 8/6/17.
  */

case class AMRData(code: String,
                   name: String,
                   surname: String,
                   gender: String,
                   dob: String,
                   attendance: String)

object AMRData {
  def apply(schoolCode: String): List[AMRData] =
    {
      DocumentDB.getAMR(schoolCode)
    }

  implicit val amrDataWriter: Writes[AMRData] = new Writes[AMRData] {
    override def writes(a: AMRData) = Json.obj(
      "code" -> a.code,
      "name" -> a.name,
      "surname" -> a.surname,
      "gender" -> a.gender,
      "dob" -> a.dob,
      "attendance" -> a.attendance
    )
  }
}


