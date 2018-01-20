package controllers

import javax.inject.Inject

import dao.DocumentDB
import play.api.i18n.{I18nSupport, MessagesApi}
import play.api.mvc.{Action, Controller}

/**
  * Created by kirankumarbs on 4/6/17.
  */
class RegistrationController @Inject()(val messagesApi: MessagesApi) extends Controller with I18nSupport {
  def submitRegistration = Action { request =>
    request.body.asJson.fold(Ok("POST input is empty"))(input => Ok(DocumentDB.insertIntoDB(input)))
  }

}
