import React from 'react';
import './App.css';

// import Loader from 'react-loader-spinner';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Button from './components/button/Button';
import ImageGallery from './components/imageGallery/ImageGallery';
import Modal from './components/modal/Modal';
import Searchbar from './components/searchbar/Searchbar';
// import initData from './data/Data.json';
import { searchService } from './services/searchAPI.js';

class App extends React.Component {
  state = {
    pageQuery: 1,
    imagesQuery: null,
    images: [],
    modalImage: null,
    totalHits: null,
    // loading: false,
  };

  handleImages = imagesQuery => {
    if (!imagesQuery) {
      toast.warn('Enter some query!');
      return this.setState({ images: [] });
    } else {
      this.setState({ pageQuery: 1, imagesQuery });
    }
  };

  fetchImages = () => {
    const { imagesQuery, pageQuery } = this.state;

    // this.setState({ loading: true });

    searchService.searchQuery = imagesQuery;
    searchService
      .fetchSearch()
      .then(images => {
        if (images.hits.length === 0) {
          toast.error('No images with this query!');
        }
        if (pageQuery > 1) {
          this.setState(prevState => ({
            images: [...prevState.images, ...images.hits], totalHits: images.totalHits,
          }));
        } else {
          this.setState({ images: images.hits, totalHits: images.totalHits });
        }
      })
      .catch(error => toast.error(error.code))
      .finally(() => {
        // this.setState({ loading: false });
      });
  };

  componentDidUpdate(_, prevState) {
    const { imagesQuery, pageQuery } = this.state;

    if (prevState.imagesQuery !== imagesQuery) {
      searchService.resetPage();
      this.fetchImages();
    }

    if (prevState.pageQuery !== pageQuery) {
      this.fetchImages();
    }
  }

  loadMore = () => {
    this.setState(prevState => {
      return { pageQuery: prevState.pageQuery + 1 };
    });
  };

  showModal = modalImage => {
    this.setState({ modalImage });
  };

  closeModal = () => {
    this.setState({ modalImage: null });
  };

  render() {
    const { images, modalImage, totalHits } = this.state;

    return (
      <>
        <Searchbar onSubmit={this.handleImages} />
        <ImageGallery images={images} showModal={this.showModal} />
        {/* {loading && (
          <Loader
            type="ThreeDots"
            color="#00BFFF"
            height={80}
            width={80}
            style={{ textAlign: 'center' }}
          />
        )} */}
        {images.length < totalHits && !<Button loadMoreBtn={this.loadMore}/>}
        {modalImage && (
          <Modal closeModal={this.closeModal}>
            <img src={modalImage.largeImageURL} alt={modalImage.tags} />
          </Modal>
        )}
        <ToastContainer position="top-right" autoClose={3000} />
      </>
    );
  }
}

export default App;
