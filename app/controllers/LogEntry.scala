package controllers

import dao.DocumentDB
import play.api.libs.json.{JsObject, JsValue, Json}
import play.api.mvc.{Action, Controller}

/**
  * Created by kirankumarbs on 4/6/17.
  */
class LogEntry extends Controller {

  def logEntry = Action { request =>

    request.body.asJson match {
      case Some(data) => Ok(insertAttendanceData(data))
      case _ => Ok("POST Input is Empty")
    }
  }


  private def insertAttendanceData(input: JsValue): String = {
    val inputWithImage = (input.as[JsObject] - "doctype") ++ Json.obj("doctype" -> "image")
    DocumentDB.insertIntoDB(inputWithImage)

    val inputWithoutImage: JsValue = input.as[JsObject] - "image"
    DocumentDB.insertIntoDB(inputWithoutImage)
  }

}
