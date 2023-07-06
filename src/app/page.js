'use client'
import React from 'react'
import Image from 'next/image'
import axios from 'axios'
import { Button, Grid, TextField, Card, Typography } from '@mui/material'
import { Box, Input } from '@chakra-ui/react'
import SlideShow from '../components/SliderShow'

export default function Home() {
  const [art, setArt] = React.useState();
  const [mus, setMus] = React.useState();
  const [lyrics, setLyrics] = React.useState();
  async function resquestMusic() {
    const key = '05f59b4739df434b6fa440100dd6c7b8'
    await axios.get(`https://api.vagalume.com.br/search.php?art=${art}&mus=${mus}&apikey=${key}`)
      .then((res) => {

        if (res.data.type == "exact" || res.data.type == "aprox") {
          const { text } = res.data.mus[0]
          setLyrics(text)
          // SlideShow(text, art,mus)
        }
      })
  }

  return (

    <Grid container style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "60vh",
      flexDirection: "column",
      
    }}>
      <Typography variant='h2' color={"#000000"} className="title" >NOTe FOUND</Typography>
      <Typography variant='h4' color={"#eeeeee"} className="title" >Seu gerador de slides musicais</Typography>
      <Grid style={{ display: "flex", flexDirection: "row", margin: 10 }}>
        <Grid style={{ display: "flex", flexDirection: "row", gap: 20, margin: 5, background: "#fff", borderRadius: 20, padding: 10, borderRadius: 15, border: "5px solid #000000" }}>
          <Input fontFamily='Caprasimo' _placeholder={{ fontFamily: 'Caprasimo', marginLeft: 45 }} placeholder='Cantor' style={{ fontSize: 32, borderRadius: 15, borderRadius: 15, border: "5px solid #000000" }} onChange={(e) => setArt(e.target.value)}></Input>
        </Grid>
        <Grid style={{ display: "flex", flexDirection: "row", gap: 20, margin: 5, background: "#fff", borderRadius: 20, padding: 10, borderRadius: 15, border: "5px solid #000000" }}>
          <Input _placeholder={{ fontFamily: 'Caprasimo', marginRight: 45 }} placeholder='Música' fontFamily='Caprasimo' style={{ fontSize: 32, borderRadius: 15, border: "5px solid #000000" }} onChange={(e) => setMus(e.target.value)}></Input>
        </Grid>
      </Grid>
      <Button onClick={resquestMusic} variant='contained' style={{borderRadius: '11px',
    border: '7px solid #000000',
    fontFamily: 'Caprasimo',
    background: '#ffffff',
    color: '#2a2929',
    fontSize: '18px'}}>Gerar Slide</Button>
      <Box>{lyrics}</Box>
    </Grid>
  )
}
