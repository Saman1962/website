import React, { Component } from "react";
import { BrowserRouter as Router,Link } from "react-router-dom";
import Lightbox from "./Lightbox";

class ListItemsWithoutDescription extends Component {
  render() {
    const { photoIndex, pathname } = this.props;
    return (
      <Router forceRefresh={false}>
        <div className="container">
          <main>
            <div className="row no-gutters align-items-start text-center">
              {this.props.data.map(item => {
                return item.image.map((items, idx) => {
                  return (
                    <div
                      key={idx}
                      className="item  item--picture col-3 text-uppercase"
                      data-id={this.props.idx}
                      onMouseOver={this.props.handleHover}
                    >
                      <Link
                        className="d-block item__link loading"
                        to={{
                          pathname:
                            process.env.PUBLIC_URL +
                            `${"/gallery/" + items.fullpath}`
                        }}
                        onClick={e => {
                          e.preventDefault();
                          this.props.handleOpen();
                          this.props.handleIdx(idx);
                        }}
                      >
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            `${"/gallery/" + items.fullpath}`
                          }
                          className="rounded mb-0 h-100  b-lazy"
                          alt={items.name}
                        />
                      </Link>
                    </div>
                  );
                });
              })}
              {this.props.children}
            </div>
          </main>
          {this.props.isOpen && (
            <Lightbox
              pathname={pathname}
              mainSrc={this.props.data[0].image[photoIndex].fullpath}
              nextSrc={
                this.props.data[0].image[
                  (photoIndex + 1) % this.props.data[0].image.length
                ].fullpath
              }
              prevSrc={
                this.props.data[0].image[
                  (photoIndex + this.props.data[0].image.length - 1) %
                    this.props.data[0].image.length
                ].fullpath
              }
              onMovePrevRequest={this.props.onMovePrevRequest}
              onMoveNextRequest={this.props.onMoveNextRequest}
            />
          )}
        </div>
      </Router>
    );
  }
}

export default ListItemsWithoutDescription;
