package controllers

import model.BfrDashboardData
import play.api.libs.json.Json
import play.api.mvc.{Action, Controller}

/**
  * Created by kirankumarbs on 6/6/17.
  */
class Dashboard extends Controller{

  def response(data: Either[List[String], BfrDashboardData]) = data match {
    case Left(l) => Ok(Json.toJson(l))
    case Right(r) => Ok(Json.toJson(r))
  }

  def data(dashboardType:String) = Action {
  response(BfrDashboardData(dashboardType=dashboardType))
  }

//  def thrData = Action {
//  response(BfrDashboardData())
//  }
//
//  def mdmData = Action {
//  response(BfrDashboardData())
//  }


}
