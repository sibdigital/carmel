import React from 'react'
import { Screen, Components } from 'react-dom-chunky'
import UserInfo from '../../auth/components/userInfo'
import { Typography } from '@rmwc/typography'
import { List, Icon, Tabs, Avatar, Alert, Progress, Steps, notification } from 'antd'
const TabPane = Tabs.TabPane
import Fade from 'react-reveal/Fade'
import Bounce from 'react-reveal/Bounce'
import {
  Card,
  CardActions,
  CardActionButtons
} from 'rmwc/Card'
import moment from 'moment'
import { Button, ButtonIcon } from 'rmwc/Button'
import Setup from '../components/setup'
import marked from 'marked'
const Step = Steps.Step
import SetupData from '../data/setup.json'
import platform from 'platform'
import { Data } from 'react-chunky'
import Task from '../components/Task'
import Challenge from '../components/Challenge'

export default class Workspace extends Screen {
  constructor (props) {
    super(props)
    this.state = {
      inProgress: true,
      ...this.state
    }
  }

  componentDidMount () {
    super.componentDidMount()
  }

  componentWillUnmount () {
    super.componentWillMount()
  }

  updateJourneyOk(response) {
    // console.log(response)
  }

  updateJourneyError(error) {
    // console.log(error)
  }

  // cachedWorkspace() {
  //   return new Promise((resolve, reject) => {
  //       Data.Cache.retrieveCachedItem("workspace")
  //                 .then((workspace) => resolve(workspace))
  //                 .catch((e) => resolve())
  //   })
  // }
  //
  // updateWorkspace(journey, workspace) {
  //   if (!journey.challenge && workspace.event && workspace.event === "startChallenge" && workspace.challenge && journey.machines) {
  //     const machineId = Object.keys(journey.machines)[0]
  //     workspace.event = "doChallenge"
  //     Data.Cache.cacheItem("workspace", workspace).then(() => {
  //       this.updateLearningJourney({ type: "start", challengeId: workspace.challenge._id, machineId })
  //       this.setState({ journey, workspace })
  //     })
  //     return
  //   }
  //
  //   if (journey.challenge) {
  //     this.setState({ journey, workspace })
  //     this.refreshCurrentChallenge()
  //     return
  //   }
  //
  //   this.setState({ journey, workspace, inProgress: false })
  // }

  getJourneySuccess (journey) {
    if (!journey || !journey[0]) {
      this.setState({ inProgress: false })
      return
    }

    this.setState({ journey: journey[0], inProgress: false })
  }

  getJourneyError(error) {
    // console.log(error)
  }

  getProfileSuccess (profile) {
    const account = Object.assign({}, this.account.user, profile[0])
    this.setState({ account })
  }

  getWalletSuccess (wallet) {
    this.setState({ wallet: wallet[0] })
  }

  subscriptionArgs (subscription) {
    if (!subscription || !this.account) {
      return {}
    }

    return { userId: this.account.user.uid }
  }

  updateLearningJourney(args) {
    const machineId = (this.state.journey && this.state.journey.machines) ? Object.keys(this.state.journey.machines)[0] : this.platformType
    setTimeout(() => {
        this.props.updateJourney(Object.assign({}, { platform: platform.os, machineId }, args))
    }, 300)
  }

  renderNewJourney(width, padding) {
    return <Fade>
        <Card style={{ width, margin: '10px', padding }}>
            <div style={{ padding: '4px', textAlign: 'center', marginBottom: '20px' }}>
              <Bounce>
                <Avatar src="/assets/chunky-logo.gif" style={{
                  height: "180px", width: "180px"
                }} />
              </Bounce>
            </div>

            <Typography use='headline5' tag='div' style={{margin: "20px", color: this.props.theme.primaryColor }}>
              You didn't start your learning journey yet
            </Typography>
          </Card>
          </Fade>
  }

  renderExistingJourney(width, padding) {
    console.log(this.state.journey)
    const title = this.state.journey && this.state.journey.completedChallenges ? (
      this.state.journey.completedChallenges.length === 1 ? 'Congrats on completing your first challenge!' :
      `You completed ${this.state.journey.completedChallenges.length} challenges so far`
    ): 'You have not completed any challenges yet'

    return <Fade>
        <Card style={{ width, margin: '10px', padding }}>
            <div style={{ padding: '4px', textAlign: 'center', marginBottom: '20px' }}>
              <Bounce>
                <Avatar src="/assets/chunky-logo.gif" style={{
                  height: "180px", width: "180px"
                }} />
              </Bounce>
            </div>
            <Typography use='headline5' tag='div' style={{margin: "10px", textAlign: "center", color: this.props.theme.primaryColor }}>
              { title }
           </Typography>
          </Card>
    </Fade>
  }

  renderTimeline(width, padding) {
    if (!this.state.journey || this.state.journey.setup) {
      return this.renderNewJourney(width, padding)
    }

    return this.renderExistingJourney(width, padding)
  }

  renderHeader(width, padding) {
    return <Card style={{ width, margin: '10px', padding }}>
          <UserInfo
            redirect={this.triggerRawRedirect}
            claimed={this.state.totalClaimed}
            wallet={this.state.wallet}
            account={this.account}
          />
      </Card>
 }

  renderMainContent () {
    if (this.state.inProgress || !this.state.wallet && !this.state.account) {
      return (
        <Components.Loading  />
      )
    }

    const width = this.isSmallScreen ? '95vw' : '700px'
    const padding = this.isSmallScreen ? '5px' : '30px'

    return (
      <div
        style={{
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
          overflow: 'hidden',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
        { this.renderHeader(width, padding) }
        { this.renderTimeline(width, padding) }
      </div>
    )
  }

  components () {
    return [this.renderMainContent()]
  }
}