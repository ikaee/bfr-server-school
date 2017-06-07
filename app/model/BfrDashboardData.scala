package model

import java.text.SimpleDateFormat
import java.util.Calendar

import dao.DocumentDB
import play.api.libs.json.{JsValue, Json, Writes}

/**
  * Created by kirankumarbs on 6/6/17.
  */
case class BfrDashboardData(attendanceData: AttendanceData,
                            genderData: List[GenderData],
                            ageData: List[AgeData],
                            monthData: MonthData)

object BfrDashboardData{
  def apply(filters: Option[Map[String, String]]=None): Either[List[String],BfrDashboardData] ={
    DocumentDB.dashboardData(filters) match {
      case Left(l) => Left(l)
      case Right(r) => Right(createBfrDashboardData(r))
    }
  }

  private def createBfrDashboardData(md: Map[String, String]): BfrDashboardData =
    BfrDashboardData(AttendanceData(md), GenderData(md), AgeData(md), MonthData(md))

  /**
    * Converting from Entity to Json while service returning response
    */
  implicit val bfrDashboardDataWrites = new Writes[BfrDashboardData] {
    override def writes(epgmDD: BfrDashboardData): JsValue = {
      Json.obj(
        "attendance_data"  -> AttendanceData(epgmDD.attendanceData),
        "gender_data"  -> GenderData(epgmDD.genderData),
        "age_data"  -> AgeData(epgmDD.ageData),
        "month_data"  -> MonthData(epgmDD.monthData)
      )
    }
  }
}


case class AgeData(value: Int, color: String)

object AgeData {
  def apply(ad: Map[String, String]): List[AgeData] =
  {
    AgeData(ad.get("6-8").getOrElse("0").toInt,  "#a1887f") ::
      AgeData(ad.get("9-11").getOrElse("0").toInt,   "#bb8fce") ::
      AgeData(ad.get("12-13").getOrElse("0").toInt, "#ccd1d1") ::
      AgeData(ad.get("14+").getOrElse("0").toInt,"#f7dc6f") :: Nil
  }
  def apply(ads: List[AgeData]) = ads.map(ad => Json.obj("value" -> ad.value, "color" -> ad.color))
}


case class GenderData(value: Int, color: String)

object GenderData {
  def apply(gd: Map[String, String]): List[GenderData] = {
    val male = gd.get("m").getOrElse("0").toInt
    val female = gd.get("f").getOrElse("0").toInt
    GenderData(male, "#ccd1d1") :: GenderData(female, "#566573") :: Nil
  }
  def apply(gds: List[GenderData]) = gds.map(gd => Json.obj("value" -> gd.value, "color" -> gd.color))
}

case class AttendanceData(total: Int, present: Int, percentage: Int)

object AttendanceData {
  def apply(gd: Map[String, String]): AttendanceData = {

    AttendanceData(gd.get("total").getOrElse("0").toInt
      ,gd.get("present").getOrElse("0").toInt
      ,gd.get("percentage").getOrElse("0").toInt
    )
  }
  def apply(gd: AttendanceData) =
    Json.obj("total"  -> gd.total, "present"  -> gd.present, "percentage"  -> gd.percentage)
}



case class MonthData(labels: List[String], datasets: List[Datasets])
object MonthData{
  def apply(md: Map[String, String]): MonthData =
  {

    val mConst = Map("01" -> "Jan","02" -> "Feb","03" -> "Mar","04" -> "Apr","05" -> "May","06" -> "Jun","07" -> "Jul","08" -> "Aug","09" -> "Sep","10" -> "Oct",
      "11" -> "Nov","12" -> "Dec")
    val now = Calendar.getInstance().getTime()
    val monthFormat = new SimpleDateFormat("MM")
    val currDt = monthFormat.format(now)

    val mDataRaw: List[(String, String)] =
      List("01" -> md.get("01").getOrElse("0"), "02" -> md.get("02").getOrElse("0"), "03" -> md.get("03").getOrElse("0"),
        "04" -> md.get("04").getOrElse("0"), "05" -> md.get("05").getOrElse("0"), "06" -> md.get("06").getOrElse("0"),
        "07" -> md.get("07").getOrElse("0"), "08" -> md.get("08").getOrElse("0"), "09" -> md.get("09").getOrElse("0"),
        "10" -> md.get("10").getOrElse("0"), "11" -> md.get("11").getOrElse("0"), "12" -> md.get("12").getOrElse("0"))

    def prepareMonthData(raw: List[(String, String)]): List[(String, String)] = {
      def loop(raw: List[(String, String)], acc: List[(String, String)]): List[(String, String)] = raw match {
        case (x, o)::xs if(x == currDt)      =>  {xs ++ acc ++ List((currDt, o))}
        case x::xs                =>  {loop(xs, acc ++ List(x))}
      }
      loop(raw,List[(String, String)]())
    }

    val combinedData = prepareMonthData(mDataRaw).unzip

    MonthData(combinedData._1.map(x => mConst.get(x).get),
      Datasets("rgba(151,187,205,0.5)", "rgba(151,187,205,1)", combinedData._2.map(_.toInt)) :: Nil)
  }

  def apply(md: MonthData) =
    Json.obj(
      "labels" -> md.labels,
      "datasets" -> Datasets(md.datasets))
}
case class Datasets(fillColor: String, strokeColor: String, data: List[Int])
object Datasets{
  def apply(ds: List[Datasets]) =
    ds.map(d => Json.obj("fillColor" -> d.fillColor, "strokeColor" -> d.strokeColor, "data" -> d.data))
}

