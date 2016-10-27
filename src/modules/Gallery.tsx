'use strict';
import * as React from "react";
import {Grid, Thumbnail, Row, Col, Image, Panel, Modal, Carousel} from 'react-bootstrap';
import {app, app$} from '../app';
import 'rxjs/add/operator/distinctUntilKeyChanged';
import 'rxjs/add/operator/pluck';
import 'rxjs/add/operator/filter';
import {setSelected, setProject, resetSelected} from '../actions';

const FeaturedImage = ({url, onClick}) =>
  <Panel>
    <Image src={url} onClick={onClick} responsive className="home-image center-block"/>
  </Panel>;

const Logo = ({logo}) => {
  return (
    <div>
      {logo === 'personal' ?
        <h1 className="text-center">Personal</h1> :
        <Image src={logo} height={100} width={200} className="center-block"/>
      }
    </div>
  );
};


const ProjectGallery = ({urls, logo}) =>
  <Panel>
    <Row>
      <Logo logo={logo}/>
    </Row>
    <br/>
    <Row>
      {urls.map((url: string, index: number) => {
        return <Col xs={6} md={4}>
          <Thumbnail href="#"
                     src={url}
                     height={100} width={100}
                     onClick={() => app.dispatch(setSelected(index))}/>
        </Col>;
      })}

    </Row>
  </Panel>;

export const Gallery = React.createClass({
  getInitialState() {
    return {selected: 0, project: {gallery: []}, showModal: false};
  },
  componentWillReceiveProps({params: {projectId}}) {
    if (this.props.params.projectId !== projectId) {
      app.dispatch(resetSelected());
      app.dispatch(setProject(projectId));
    }
  },
  componentDidMount() {
    app$.distinctUntilKeyChanged('projects')
      .pluck('projects')
      .filter(({selected}) => !!selected)
      .subscribe(({selected}) => {
        const {folder, gallery} = selected;
        const ext = selected.ext || this.props.route.defaultExt;
        this.setState({project: {folder, gallery, ext}});
      });

    app$.distinctUntilKeyChanged('gallery')
      .pluck('gallery')
      .subscribe(({selected}) => this.setState({selected}));

    // Initialize the first time we arrive here
    app.dispatch(setProject(this.props.params.projectId));
  },
  close() {
    this.setState({showModal: false});
  },
  open() {
    this.setState({showModal: true});
  },
  render() {
    const baseUrl = this.props.route.baseUrl;
    const {gallery, folder, ext} = this.state.project;
    const selected = this.state.selected;
    const thumbUrls = gallery.map(({name}) =>
      `${baseUrl}/${folder}/thumb/${name}_Thumb.jpg`
    );

    const highlightUrl = !!folder && gallery.length > 0 && selected > -1 ?
      `${baseUrl}/${folder}/${gallery[selected].name}.${ext}` :
      '';

    let logo = '';

    if (folder === 'personal') {
      logo = 'personal'
    } else if (!!folder) {
      logo = `${baseUrl}/${folder}/logo.png`;
    }

    return (
      <Grid>
        <Col xs={12} md={4} mdOffset={1}>
          <ProjectGallery urls={thumbUrls} logo={logo}/>
        </Col>
        <Col xs={12} md={6} mdOffset={1}>
          <FeaturedImage url={highlightUrl} onClick={this.open}/>
        </Col>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Body>
            <Carousel>
              {
                gallery.map((item, i) => {
                  const itemSource = `${baseUrl}/${folder}/${item.name}.${ext}`;
                  return (
                    <Carousel.Item>
                      <img width={900} height={500} src={itemSource}/>
                    </Carousel.Item>
                  )
                })
              }
            </Carousel>
          </Modal.Body>
        </Modal>
      </Grid>
    )
  }
});