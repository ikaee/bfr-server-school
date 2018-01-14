package controllers

import javax.inject.Inject

import dao.DocumentDB
import play.api.data.Form
import play.api.data.Forms._
import play.api.i18n.{I18nSupport, MessagesApi}
import play.api.mvc.{Action, Controller}

/**
  * Created by kirankumarbs on 4/6/17.
  */
class RegistrationController @Inject() (val messagesApi: MessagesApi) extends Controller with I18nSupport{

  private val registration: Form[Registration] = Form(mapping(
    "doctype" -> text,
    "name" -> text,
    "surname" -> text,
    "dob" -> text,
    "studentcode" -> text,
    "schoolcode" -> text,
    "gender" -> char
  )(Registration.apply)(Registration.unapply))


  def submitRegistration = Action { request =>
    Ok("")
  }

}

case class Registration(
                         doctype: String ="registration",
                         name: String,
                         surname: String,
                         dob: String,
                         studentcode: String,
                         schoolcode: String,
                         gender: Char)
