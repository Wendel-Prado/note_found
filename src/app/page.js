'use client'
import React from 'react'
import Image from 'next/image'
import axios from 'axios'
import { Button, Grid, TextField, Card, Typography } from '@mui/material'
import { Box, Input, Container } from '@chakra-ui/react'
import localFont from 'next/font/local'
import SlideShow from '../components/SliderShow'
import SearchIcon from '@mui/icons-material/Search';
import Fab from '@mui/material/Fab';
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
          SlideShow(text, art, mus)
        }
      })
  }

  return (
    <Grid style={{height:"100%",width:"100%"}}>
      <Container style={{display:"grid", justifyContent:"center", height:"60vh"}}>
        <Grid style={{display:"flex",justifyContent:"center", alignItems:"flex-end"}}>
        <Image title='logo'  alt='logo' src={'/image/stuune.png'} width={298} height={150} style={{objectFit:"contain"}}></Image>
        </Grid>
        <Grid item lg={12} justifyContent="center" >
          <TextField 
          placeholder='Cantor/Banda'
          size='small' 
          style={{margin:10, background:"#fff"}}/>
          <TextField 
          placeholder='Música'
          size='small' 
          style={{margin:10,background:"#fff"}}/>
          <Fab>
            <SearchIcon/>
          </Fab>
        </Grid>

      </Container >
      <Container style={{display:"flex", height:"60vh"}}>
        <Grid style={{height:"100%",width:"40%"}}>
          <Typography variant='h3' className={"title"} style={{fontFamily:""}}>Como utilizar</Typography>
          <Typography variant='h3' className={"title"} style={{fontFamily:""}}>e por que utilizar o STUUNE?</Typography>
          </Grid>
        <Grid style={{height:"100%",width:"60%"}}></Grid>
      </Container >
    </Grid>
  )
}
