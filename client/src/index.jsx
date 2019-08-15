import React from "react";
import ReactDOM from "react-dom";
import axios from "axios";
import Display from "./components/Display.jsx";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Header from "./components/Header.jsx";
import Footer from "./components/Footer.jsx";
import Chart from "./components/Chart.jsx";
import moment from "moment";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      thumbnail: "",
      subscriberCount: "",
      videoCount: "",
      customUrl: "",
      chartSetup: {},
      subscriberArr: [],
      timeArr: []
    };
    this.handleSearchedYoutuber = this.handleSearchedYoutuber.bind(this);
  }

  componentDidMount() {
    let bigYoutubers = [
      "pewdiepie",
      "corycotton",
      "jakepaulproductions",
      "tseries",
      "MrBeast6000",
      "ninjashyper"
    ];
    var randomYoutuber =
      bigYoutubers[Math.floor(bigYoutubers.length * Math.random())];
    axios
      .get("/getYoutuberData", {
        params: { username: randomYoutuber }
      })
      .then(data => {
        console.log(data.data[0]);
        this.setState({
          username: data.data[0].snippet.title,
          thumbnail: data.data[0].snippet.thumbnails.default.url,
          subscriberCount: parseInt(data.data[0].statistics.subscriberCount),
          videoCount: parseInt(data.data[0].statistics.videoCount),
          customUrl: randomYoutuber,
          subscriberArr: [
            ...this.state.subscriberArr,
            parseInt(data.data[0].statistics.subscriberCount)
          ],
          timeArr: [...this.state.timeArr, moment().format("LTS")],
          chartSetup: {
            labels: [...this.state.timeArr, moment().format("LTS")],
            datasets: [
              {
                label: "# of Subscribers",
                data: [
                  ...this.state.subscriberArr,
                  parseInt(data.data[0].statistics.subscriberCount)
                ],
                backgroundColor: [
                  "rgba(255, 99, 132, 0.2)",
                  "rgba(54, 162, 235, 0.2)",
                  "rgba(255, 206, 86, 0.2)",
                  "rgba(75, 192, 192, 0.2)",
                  "rgba(153, 102, 255, 0.2)",
                  "rgba(255, 159, 64, 0.2)"
                ],
                borderColor: [
                  "rgba(255, 99, 132, 1)",
                  "rgba(54, 162, 235, 1)",
                  "rgba(255, 206, 86, 1)",
                  "rgba(75, 192, 192, 1)",
                  "rgba(153, 102, 255, 1)",
                  "rgba(255, 159, 64, 1)"
                ],
                borderWidth: 1
              }
            ]
          },
          options: {
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true
                  }
                }
              ]
            }
          }
        });
      })
      .catch(err => {
        console.log(err);
      });

    setInterval(() => {
      console.log(this.state);
      axios
        .get("/getYoutuberData", {
          params: { username: this.state.customUrl }
        })
        .then(data => {
          console.log(data.data[0]);
          this.setState({
            username: data.data[0].snippet.title,
            thumbnail: data.data[0].snippet.thumbnails.default.url,
            subscriberCount: data.data[0].statistics.subscriberCount,
            videoCount: data.data[0].statistics.videoCount,
            subscriberArr: [
              ...this.state.subscriberArr,
              parseInt(data.data[0].statistics.subscriberCount)
            ],
            timeArr: [...this.state.timeArr, moment().format("LTS")],
            chartSetup: {
              labels: [...this.state.timeArr, moment().format("LTS")],
              datasets: [
                {
                  label: "# of Subscribers",
                  data: [
                    ...this.state.subscriberArr,
                    parseInt(data.data[0].statistics.subscriberCount)
                  ],
                  backgroundColor: [
                    "rgba(255, 99, 132, 0.2)",
                    "rgba(54, 162, 235, 0.2)",
                    "rgba(255, 206, 86, 0.2)",
                    "rgba(75, 192, 192, 0.2)",
                    "rgba(153, 102, 255, 0.2)",
                    "rgba(255, 159, 64, 0.2)"
                  ],
                  borderColor: [
                    "rgba(255, 99, 132, 1)",
                    "rgba(54, 162, 235, 1)",
                    "rgba(255, 206, 86, 1)",
                    "rgba(75, 192, 192, 1)",
                    "rgba(153, 102, 255, 1)",
                    "rgba(255, 159, 64, 1)"
                  ],
                  borderWidth: 1
                }
              ]
            },
            options: {
              scales: {
                yAxes: [
                  {
                    ticks: {
                      beginAtZero: true
                    }
                  }
                ]
              }
            }
          });
        })
        .catch(err => {
          console.log(err);
        });
    }, 2000);
  }

  handleSearchedYoutuber(entry) {
    axios
      .get("/getYoutuberData", {
        params: { username: entry }
      })
      .then(data => {
        this.setState({
          username: data.data[0].snippet.title,
          thumbnail: data.data[0].snippet.thumbnails.default.url,
          subscriberCount: parseInt(data.data[0].statistics.subscriberCount),
          videoCount: parseInt(data.data[0].statistics.videoCount),
          customUrl: entry,
          chartSetup: {},
          subscriberArr: [],
          timeArr: []
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <div>
        <Container>
          <Header />

          <div style={{ paddingTop: 60 }}>
            <Grid container justify="center" alignItems="center">
              <Typography variant="h4" style={{ paddingBottom: 10 }}>
                YouTube Subscriber Count
              </Typography>
            </Grid>
            <Grid container justify="center" alignItems="center">
              <Typography variant="subtitle2" style={{ paddingBottom: 10 }}>
                Real-time count for YouTube Subscribers and media statistics
              </Typography>
            </Grid>
            <Display
              username={this.state.username}
              thumbnail={this.state.thumbnail}
              subscriberCount={this.state.subscriberCount}
              videoCount={this.state.videoCount}
              handleSearchedYoutuber={this.handleSearchedYoutuber}
              customUrl={this.state.customUrl}
            />
          </div>
          <br />
          <Chart chartSetup={this.state.chartSetup} />
          <Footer />
        </Container>
      </div>
    );
  }
}

var mountNode = document.getElementById("app");
ReactDOM.render(<App name="Kevin" />, mountNode);
