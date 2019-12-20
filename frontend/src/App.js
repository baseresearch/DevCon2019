import React, { PureComponent } from 'react';
import moment from 'moment';
import {
  Typography,
  Row,
  Col,
  DatePicker,
  Card,
  Steps,
  Tabs,
  Button,
} from 'antd';
import GenderChart from './components/GenderChart';
import LanguageChart from './components/LanguageChart';

import 'antd/dist/antd.css';
import './App.css';

const { Step } = Steps;
const { TabPane } = Tabs;

const endpoint = 'http://localhost:3004';

class App extends PureComponent {
  state = {
    genders: null,
    languages: null,
    conferences: [
      { title: 'Enabling addons in SaaS System', description: '11:45 AM' },
      { title: 'Enhancing Professional Capacity Through CPD', description: '12:45 AM' },
      { title: 'Microsoft Power Platform and Business Intelligence', description: '1:30 AM' },
    ],
    dateTime: moment(),
  };

  componentDidMount() {
    // Fetch Gender
    fetch(`${endpoint}/genders`)
      .then(res => res.json())
      .then(result => this.setState({ genders: result }))
      .catch(err => console.error(err));

    // Fetch Languages
    fetch(`${endpoint}/languages`)
      .then(res => res.json())
      .then(result => this.setState({ languages: result }))
      .catch(err => console.error(err));
  }

  changeDateTime = (dateTime) => {
    this.setState({ dateTime });
  }

  onDatePickerClickOk = () => {
    // Call API
    console.log(this.state.dateTime.format());
  }

  render() {
    return (
      <div className="App">
        <Typography.Title className="text-center">Dev-Con Myanmar 2019 Bot Analytics</Typography.Title>
        <div className="card-container">
          <Tabs type="card" defaultActiveKey="2" tabPosition="top">
            <TabPane key="1" tab={<span>In this Room</span>}>
              <div className="flex-center my-2">
                <DatePicker
                  style={{ width: 300 }}
                  placeholder="Select desired Date and Time"
                  format="DD-MM-YYYY HH:mm:ss"
                  showTime={{ defaultValue: moment('00:00:00', 'HH:mm:ss') }}
                  onChange={this.changeDateTime}
                  onOk={this.onDatePickerClickOk}
                />
              </div>
              <Row gutter={[16, 16]}>
                <Col span={8} offset={4}>
                  <Card title="Male &amp; Female">
                    {
                      this.state.genders &&
                        <GenderChart
                          data={this.state.genders}
                        />
                    }
                  </Card>
                </Col>
                <Col span={8} offset={4} pull={4}>
                  <Card title="Locales Used">
                    {
                      this.state.languages &&
                        <LanguageChart
                          data={this.state.languages}
                        />
                    }
                  </Card>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={8} offset={4}>
                  <Card title="Male &amp; Female"></Card>
                </Col>
                <Col span={8} offset={4} pull={4}>
                  <Card title="Male &amp; Female"></Card>
                </Col>
              </Row>
            </TabPane>
            <TabPane key="2" tab={<span>Person History</span>}>
              <Row gutter={[16, 16]} type="flex" justify="center">
                <Col span={2}>
                  <Button type="primary">Randomize one!</Button>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col offset={4}>
                  <Typography.Title level={2}>This person: PERSON ID</Typography.Title>
                </Col>
              </Row>
              <Row gutter={[16, 16]}>
                <Col span={16} offset={4}>
                  <Card title="Has visited these conferences">
                    {
                      this.state.conferences &&
                        <Steps progressDot direction="vertical" current={this.state.conferences.length}>
                          {
                            this.state.conferences.map((conference, i) => {
                              return (
                                <Step key={i} title={conference.title} description={conference.description} />
                              );
                            })
                          }
                        </Steps>
                    }
                  </Card>
                </Col>
              </Row>
            </TabPane>
          </Tabs>
        </div>
      </div>
    );
  }
}

export default App;
