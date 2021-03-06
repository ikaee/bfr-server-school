package controllers


import dao.DocumentDB
import model.THRData
import play.api.libs.json.{JsValue, Json, Writes}
import play.api.mvc.{Action, Controller}

class THRController extends Controller {

  def getTHR(schoolCode: String) = Action {equals()
    Ok(Json.toJson(THRData(schoolCode)))
  }

  def getTHRDropDown() = Action {
    Ok(
      Json.arr(
        Json.obj("value" -> "27511010507", "label" -> "PIMPALGAO 2"),
        Json.obj("value" -> "27511010509", "label" -> "PIMPALGAO 4"),
        Json.obj("value" -> "27511010209", "label" -> "YELEGOAN (1)"),
        Json.obj("value" -> "27511010211", "label" -> "YELEGOAN (3)"),
        Json.obj("value" -> "27511010406", "label" -> "KONDHA 3"),
        Json.obj("value" -> "27511010407", "label" -> "KONDHA 4"),
        Json.obj("value" -> "27511010109", "label" -> "LAHAN 4"),
        Json.obj("value" -> "27511010111", "label" -> "LAHAN 6"),
        Json.obj("value" -> "27511010305", "label" -> "MALEGAON-3"),
        Json.obj("value" -> "27511010306", "label" -> "MALEGAON-4")
      )
    )
  }

  def studentImage(schoolCode: String, studentCode: String) = Action {
    Ok(DocumentDB.studentImage(schoolCode, studentCode))
  }

  implicit val thrWrite = new Writes[List[THRData]] {
    override def writes(o: List[THRData]): JsValue = Json.obj(
      "data" -> o
    )
  }

}
