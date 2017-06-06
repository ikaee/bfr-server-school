package model

import dao.{DocumentDB}
import play.api.libs.json.{JsValue, Json, Writes}

/**
  * Created by kirankumarbs on 6/6/17.
  */
case class BfrDashboardData(gradeData: GradeData,
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
    BfrDashboardData(GradeData(md), GenderData(md), AgeData(md), MonthData(md))

  /**
    * Converting from Entity to Json while service returning response
    */
  implicit val bfrDashboardDataWrites = new Writes[BfrDashboardData] {
    override def writes(epgmDD: BfrDashboardData): JsValue = {
      Json.obj(
        "grade_data"  -> GradeData(epgmDD.gradeData),
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
    AgeData(ad.get("zerotoonecount").getOrElse("0").toInt,  "#a1887f") ::
      AgeData(ad.get("onetotwocount").getOrElse("0").toInt,   "#bb8fce") ::
      AgeData(ad.get("twotothreecount").getOrElse("0").toInt, "#ccd1d1") ::
      AgeData(ad.get("threetofourcount").getOrElse("0").toInt,"#f7dc6f") :: Nil
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

case class GradeData(total: Int, present: Int, percentage: Int)

object GradeData {
  def apply(gd: Map[String, String]): GradeData = {

    GradeData(gd.get("total").getOrElse("0").toInt
      ,gd.get("present").getOrElse("0").toInt
      ,gd.get("percentage").getOrElse("0").toInt
    )
  }
  def apply(gd: GradeData) =
    Json.obj("total"  -> gd.total, "present"  -> gd.present, "percentage"  -> gd.percentage)
}



case class MonthData(labels: List[String], datasets: List[Datasets])
object MonthData{
  def apply(md: Map[String, String]): MonthData =
  {

    val mConst = Map("01" -> "Jan","02" -> "Feb","03" -> "Mar","04" -> "Apr","05" -> "May","06" -> "Jun","07" -> "Jul","08" -> "Aug","09" -> "Sep","10" -> "Oct",
      "11" -> "Nov","12" -> "Dec")
    val currDt = md.get("currentmonth").getOrElse("01")

    //val currYr = md.get("currentyear").get
    val mDataRaw = List("01" -> md.get("januarycount").getOrElse("0"), "02" -> md.get("februarycount").getOrElse("0"),"03" -> md.get("marchcount").getOrElse("0"), "04" -> md.get("aprilcount").getOrElse("0"),
      "05" -> md.get("maycount").getOrElse("0"), "06" -> md.get("junecount").getOrElse("0"), "07" -> md.get("julycount").getOrElse("0"), "08" -> md.get("augustcount").getOrElse("0"), "09" -> md.get("septembercount").getOrElse("0"),
      "10" -> md.get("octobercount").getOrElse("0"),"11" -> md.get("novembercount").getOrElse("0"), "12" -> md.get("decembercount").getOrElse("0"))

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

