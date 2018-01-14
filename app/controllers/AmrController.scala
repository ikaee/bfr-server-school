package controllers

import javax.inject._

import model.AMRData
import play.api.i18n.{I18nSupport, MessagesApi}
import play.api.libs.json.{JsValue, Json, Writes}
import play.api.mvc.{Action, Controller}

/**
  * Created by kirankumarbs on 7/6/17.
  */
class AmrController @Inject()(val messagesApi: MessagesApi) extends Controller with I18nSupport {

  def getAMR(schoolCode: String) = Action {
    Ok(Json.toJson(AMRData(schoolCode)))
  }

  def getAMRDropDown() = Action {
    Ok(
      Json.arr(
        Json.obj("value" -> "asdf", "label" -> "asdf"),
        Json.obj("value" -> "123", "label" -> "Bar")
      )
    )
  }


  implicit val amrWrite = new Writes[List[AMRData]] {
    override def writes(o: List[AMRData]): JsValue = Json.obj(
      "data" -> o
    )
  }


}
