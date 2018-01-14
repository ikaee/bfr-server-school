import com.typesafe.sbt.packager.docker.{Cmd, ExecCmd}

name := """bfr-server"""
version := "1.0-SNAPSHOT"
scalaVersion := "2.11.8"

lazy val root = (project in file(".")).enablePlugins(PlayScala, DockerPlugin)


libraryDependencies ++= Seq(
  jdbc,
  cache,
  ws,
  filters,
  "com.microsoft.azure" % "azure-documentdb" % "1.10.0",
  "com.google.code.gson" % "gson" % "2.8.0",
  "org.scalatest" %% "scalatest" % "3.0.1" % "test",
  "junit" % "junit" % "4.12",
  "com.spotify" % "docker-client" % "3.5.13"
)

dockerCommands := Seq()

dockerCommands := Seq(
  Cmd("FROM", "ikaee/alpine-bash-java8"),
  Cmd("MAINTAINER", "IkaeeSoft"),
  Cmd("WORKDIR", "/opt/docker"),
  Cmd("ADD", "opt /opt"),
  ExecCmd("RUN", "chown", "-R", "daemon:daemon", "."),
  Cmd("USER", "daemon"),
  Cmd("ENV","APPLICATION_SECRET lnY7KObrO/P^T<@mTKt7olO@lxGi]yA[1=__?VDW;qY9WjebDM@YAQ9`dx9W4F2A"),
  ExecCmd("ENTRYPOINT", "bin/bfr-server"),
  ExecCmd("CMD", "")
)

PlayKeys.playDefaultPort := 8080