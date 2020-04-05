import React from 'react';
import { ApplicationState } from '@redux/index';
import { connect } from 'react-redux';
import { switchPageKeepProperties } from '@redux/page/actions';

type Props = {

} & ReturnType<typeof mapStateToProps> & typeof mapDispatchToProps
function Main(props: Props) {
  return (<>
    <p>Main...</p>
    <button onClick={() => {
      props.switchPageKeepProperties({
        pageName: 'CreateLobbyPage',
        properties: ['memberId']
      })
    }}>
      Neue Lobby erstellen
    </button>
  </>)
}

const mapStateToProps = (state: ApplicationState /*, ownProps*/) => {
  return {
    page: state.page
  }
}

const mapDispatchToProps = { switchPageKeepProperties }

export default connect(mapStateToProps, mapDispatchToProps)(Main);