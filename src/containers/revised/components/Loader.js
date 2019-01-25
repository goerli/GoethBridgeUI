import React from 'react'
import { Keyframes, animated, config } from 'react-spring'
import delay from 'delay'

const Content = Keyframes.Spring(async next => {
    await next({
        from: { opacity: 0, width: 50, height: 50, background: '#b3d7b2' },
        opacity: 1,
        width: 80,
        height: 80,
        background: '#fdc1b9',
    })
    await next({
        from: { left: '0%' },
        left: '70%',
        background: '#8dd7d0',
    })
    next({
        from: { top: '0%' },
        top: '70%',
        background: '#b3d7b2',
        config: config.wobbly,
    })
    await delay(1000)
    await next({ left: '0%', background: '#c3abca' })      
    await next({
        top: '0%',
        background: '#96d8c9',
    }) 
    await next({
        opacity: 0,
        width: 40,
        height: 40,
        background: '#b3d7b2',
    })     
  })

export default class Loader extends React.Component {
    render() {
      const { isLoading } = this.props;
      return (
        <div>
          {
            isLoading 
            ? <div
              style={{
                width: '100%',
                height: '100vh',
                overflow: 'hidden',
                padding: 10,
              }}>
              <Content native>
                {props => (
                  <animated.div
                    style={{ position: 'relative', borderRadius: '50%', ...props }}
                  />
                )}
              </Content>
            </div>
          : null
          }
        </div>
      )
    }
  }