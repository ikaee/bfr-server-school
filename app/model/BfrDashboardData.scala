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
                            monthData: List[MonthData])

object BfrDashboardData {
  def apply(filters: Option[Map[String, String]] = None): Either[List[String], BfrDashboardData] = {
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
    override def writes(bfrDD: BfrDashboardData): JsValue = {
      Json.obj(
        "attendance_data" -> AttendanceData(bfrDD.attendanceData),
        "gender_data" -> GenderData(bfrDD.genderData),
        "age_data" -> AgeData(bfrDD.ageData),
        "month_data" -> MonthData(bfrDD.monthData)
      )
    }
  }
}


case class AgeData(name: String, value: Int)

object AgeData {
  def apply(ad: Map[String, String]): List[AgeData] = {
    AgeData("6Y-8Y", ad.get("6-8").getOrElse("0").toInt) ::
      AgeData("9Y-11Y", ad.get("9-11").getOrElse("0").toInt) ::
      AgeData("12Y-13Y", ad.get("12-13").getOrElse("0").toInt) ::
      AgeData("14Y+", ad.get("14+").getOrElse("0").toInt) :: Nil
  }

  def apply(ads: List[AgeData]) = ads.map(ad => Json.obj("name" -> ad.name, "value" -> ad.value))
}


case class GenderData(value: String, color: String)

object GenderData {
  def apply(gd: Map[String, String]): List[GenderData] = {
    val male = gd.get("m").getOrElse("0")
    val female = gd.get("f").getOrElse("0")
    GenderData(male, "#ff6c60") :: GenderData(female, "#6ccac9") :: Nil
  }

  def apply(gds: List[GenderData]) = gds.map(gd => Json.obj("value" -> gd.value, "color" -> gd.color))
}

case class AttendanceData(total: Int, present: Int, percentage: Int)

object AttendanceData {
  def apply(gd: Map[String, String]): AttendanceData = {

    AttendanceData(gd.get("total").getOrElse("0").toInt
      , gd.get("present").getOrElse("0").toInt
      , gd.get("percentage").getOrElse("0").toInt
    )
  }

  def apply(gd: AttendanceData) =
    Json.obj("total" -> gd.total, "present" -> gd.present, "percentage" -> gd.percentage)
}


case class MonthData(name: String, value: Int)

object MonthData {
  def apply(md: Map[String, String]): List[MonthData] = {

    val mConst = Map("01" -> "Jan", "02" -> "Feb", "03" -> "Mar", "04" -> "Apr", "05" -> "May", "06" -> "Jun", "07" -> "Jul", "08" -> "Aug", "09" -> "Sep", "10" -> "Oct",
      "11" -> "Nov", "12" -> "Dec")
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
        case (x, o) :: xs if (x == currDt) => {
          xs ++ acc ++ List((currDt, o))
        }
        case x :: xs => {
          loop(xs, acc ++ List(x))
        }
      }

      loop(raw, List[(String, String)]())
    }

    val combinedData: List[(String, String)] = prepareMonthData(mDataRaw)

    combinedData.map(d => MonthData(mConst.get(d._1).get, d._2.toInt))
  }

  def apply(md: List[MonthData]) =
    md.map(m => Json.obj(
      "name" -> m.name,
      "value" -> m.value))
}

