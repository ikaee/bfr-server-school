package controllers


import dao.DocumentDB
import model.AMRData
import play.api.libs.json.{JsValue, Json, Writes}
import play.api.mvc.{Action, Controller}

/**
  * Created by kirankumarbs on 7/6/17.
  */
class AmrController extends Controller {

  def getAMR(schoolCode: String) = Action {
    Ok(Json.toJson(AMRData(schoolCode)))
  }

  def getAMRDropDown() = Action {
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

  implicit val amrWrite = new Writes[List[AMRData]] {
    override def writes(o: List[AMRData]): JsValue = Json.obj(
      "data" -> o
    )
  }


}
