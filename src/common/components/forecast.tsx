import { useEffect, useState } from "react";

import {
  CircularProgress,
  Grid,
  Card,
  CardHeader,
  CardContent,
  Typography,
  Container,
} from "@mui/material";

import { weatherStatus, windStatus } from "@/common/constants/weather";
import { dayInWeek, dateIntToString } from "@/common/utils/utils";

interface props {
  location: any;
}

export default function Forecast({ location }: props) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/forecast?lat=${location.latitude}&lng=${location.longitude}`)
      .then((res) => res.json())
      .then((res: any) => {
        if (res.data && res.data.dataseries) {
          setData(res.data.dataseries);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [location]);

  if (data.length == 0) {
    return <></>;
  }

  return loading ? (
    <Container className="forecast-loading">
      <CircularProgress />
    </Container>
  ) : (
    <Grid container spacing={2} mt={3}>
      {data.map((row: any, idx: number) => (
        <Grid key={idx} item xs={12} md={6} lg={4}>
          <Card>
            <CardHeader
              avatar={<img src={`./weather/${row.weather}.png`}></img>}
              title={dateIntToString(row.date)}
              subheader={dayInWeek(row.date)}
            />

            <CardContent>
              <Typography paragraph>Weather Type: {row.weather}</Typography>
              <Typography paragraph>
                Weather Status: {weatherStatus[row.weather]}
              </Typography>
              <Typography paragraph>
                Temperature: {row.temp2m.min}°C ~ ${row.temp2m.max}°C
              </Typography>
              <Typography paragraph>
                Wind: {windStatus[row.wind10m_max]}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}
