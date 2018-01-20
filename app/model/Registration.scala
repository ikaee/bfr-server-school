package model

import play.api.libs.json.{JsValue, Json, Writes}

case class Registration(schoolCode: String, studentCode: String, fullName: String, registrationDate: String)
object Registration{
  implicit val registrationWriter: Writes[Registration] = new Writes[Registration] {
    override def writes(o: Registration): JsValue = Json.obj(
      "schoolcode" -> o.schoolCode,
      "studentcode" -> o.studentCode,
      "fullname" -> o.fullName,
      "registration-date" -> o.registrationDate
    )
  }
}
