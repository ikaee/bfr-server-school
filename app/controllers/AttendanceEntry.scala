package controllers

import dao.DocumentDB
import play.api.mvc.{Action, Controller}

/**
  * Created by kirankumarbs on 4/6/17.
  */
class AttendanceEntry extends Controller{

  def entry = Action { request =>

    request.body.asJson match {
      case Some(data) => Ok(DocumentDB.insertAttendanceEntry(data))
      case _ => Ok("POST Input is Empty")
    }
  }

}
