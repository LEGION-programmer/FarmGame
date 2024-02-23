import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import AppStyle from "../App.module.css"
import socket from "../socket"

const MainPage = () => {
  const navigate = useNavigate()
  const [nickname, setNickname] = useState("")
  const [roomId, setRoomId] = useState("")
  const [mess, setMess] = useState("")
  const date = new Date()
  const year = date.getFullYear()

  const createRoom = () => {
    const roomId = Math.floor(Math.random() * 100000)
    window.localStorage.setItem("owner", "true")
    socket.emit("check-room-id", roomId.toString(), nickname)
  }

  const joinRoom = () => {
    socket.emit("join-room", roomId.toString(), nickname)
  }

  useEffect(() => {
    socket.on("room-validation", ({ validationStatus, roomId }) => {
      if (validationStatus) {
        window.localStorage.setItem("roomId", roomId)
        window.localStorage.setItem("nickname", nickname)
        navigate("/lobby")
      } else {
        createRoom()
      }
    })

    socket.on("join-room-res", ({ validationStatus, mess }) => {
      if (validationStatus) {
        window.localStorage.setItem("roomId", roomId)
        window.localStorage.setItem("nickname", nickname)
        navigate("/lobby")
      } else {
        setMess(mess)
      }
    })
  }, [socket, nickname])

  return (
    <div className={AppStyle.con}>
      <header className={AppStyle.bg}>
        <h1 className={AppStyle.headerText}>WELCOME IN FARM GAME</h1>
      </header>
      <main className={AppStyle.bg}>
        <input
          type="text"
          placeholder="Enter your nickname"
          className={AppStyle.inputNick}
          value={nickname}
          onChange={(event) => {
            setNickname(event.target.value)
          }}
        />
        {nickname ? (
          <div>
            <div className={AppStyle.option}>
              <h1 className={AppStyle.headerText}>Join to room</h1>
              <input
                type="text"
                placeholder="Enter room id"
                className={AppStyle.inputRoom}
                value={roomId}
                onChange={(event) => {
                  setRoomId(event.target.value)
                }}
              />
              <p className={AppStyle.button} onClick={joinRoom}>
                Join
              </p>
              <span className={AppStyle.mess}>{mess}</span>
            </div>
            <div className={AppStyle.option}>
              <h1 className={AppStyle.headerText}>Create room</h1>
              <p className={AppStyle.button} onClick={createRoom}>
                Create
              </p>
            </div>
          </div>
        ) : null}
      </main>
      <footer className={AppStyle.footer}>
        <p className={AppStyle.footerText}>
          Copyright © {year} Tomasz Legion Kaczmarek
        </p>
      </footer>
    </div>
  )
}

export default MainPage