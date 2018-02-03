package controllers

import dao.DocumentDB
import model.HotCookedData
import play.api.libs.json.{JsValue, Json, Writes}
import play.api.mvc.{Action, Controller}

class HotCookedController extends Controller {

  def getHotCooked(schoolCode: String) = Action {
    equals()
    Ok(Json.toJson(HotCookedData(schoolCode)))
  }

  def getHotCookedDropDown() = Action {
    Ok(
      Json.arr(
        Json.obj("value" -> "12345", "label" -> "ZP School 1"),
        Json.obj("value" -> "12346", "label" -> "ZP School 2"),
        Json.obj("value" -> "12347", "label" -> "ZP School 3"),
        Json.obj("value" -> "12348", "label" -> "ZP School 4"),
        Json.obj("value" -> "12349", "label" -> "ZP School 5")
      )
    )
  }

  def studentImage(schoolCode: String, studentCode: String) = Action {
    Ok(DocumentDB.studentImage(schoolCode, studentCode))
  }

  implicit val thrWrite = new Writes[List[HotCookedData]] {
    override def writes(o: List[HotCookedData]): JsValue = Json.obj(
      "data" -> o
    )
  }

}
