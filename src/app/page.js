'use client'
import React from 'react'
import Image from 'next/image'
import axios from 'axios'
import { Button, Grid, TextField,Card, Typography } from '@mui/material'
import { Box, Input } from '@chakra-ui/react'
import localFont from 'next/font/local'
import SlideShow from '../components/SliderShow'
const myFont = localFont({ src: '../components/fonts/Caprasimo-Regular.ttf' })
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
          SlideShow(text, art,mus)
        }
      })
  }

  return (
    
    <Grid container style={{ 
      display: "flex", 
      justifyContent: "center", 
      alignItems: "center", 
      minHeight: "60vh" ,
     flexDirection:"column"
    }}>
      <Typography variant='h2' color={"#eeeeee"}className={myFont.className}>NOTe FOUND</Typography>
      <Typography variant='h4' color={"#eeeeee"}  className={myFont.className}>Seu gerador de slides musicais</Typography>
      <Grid style={{ display: "flex", flexDirection:"row", gap:20,margin:10}}>
        
        <Input  style={{fontSize:32}} onChange={(e) => setArt(e.target.value)}></Input>
        <Input style={{fontSize:32}}  onChange={(e) => setMus(e.target.value)}></Input>
        
      </Grid>
      <Button onClick={resquestMusic} variant='contained'>Gerar Musica</Button>
      <Box>{lyrics}</Box>
    </Grid>
  )
}
