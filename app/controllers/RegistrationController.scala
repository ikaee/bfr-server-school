package controllers

import java.text.SimpleDateFormat
import java.util.{Date, TimeZone}
import javax.inject.Inject

import dao.DocumentDB
import play.api.i18n.{I18nSupport, MessagesApi}
import play.api.libs.json.{JsObject, Json}
import play.api.mvc.{Action, Controller}

/**
  * Created by kirankumarbs on 4/6/17.
  */
class RegistrationController @Inject()(val messagesApi: MessagesApi) extends Controller with I18nSupport {
  def submitRegistration = Action { request =>
    val simpleDateFormat = new SimpleDateFormat("dd-MM-yyyy")
    simpleDateFormat.setTimeZone(TimeZone.getTimeZone("IST"))
    val currentDate: String = simpleDateFormat.format(new Date())

    request.body.asJson.fold(Ok("POST input is empty"))(input => {
      val inputWithDate = input.as[JsObject] ++ Json.obj("registration-date" -> currentDate)
      Ok(DocumentDB.insertIntoDB(inputWithDate))
    })
  }

}
