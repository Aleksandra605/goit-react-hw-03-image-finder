// function add() {
//   return (
//     <div>
//       {showModal === true && <Modal />}
//       {pictures === null && <p className={s.div}>Enter somethimg</p>}
//       {status === 'pending' && (
//         <div className={s.divLoader}>
//           <Loader
//             type="MutatingDots"
//             color="#0b6470"
//             secondaryColor="rgb(72, 163, 185)"
//             height={100}
//             width={100}
//           />
//         </div>
//       )}
//       {status === 'rejected' && <ToastContainer position="top-center" />}
//       {status === 'resolved' && (
//         <div className={s.contentBox}>
//           <ul className={s.list}>
//             {this.state.pictures.map(picture => (
//               <ImageGalleryItem
//                 src={picture.webformatURL}
//                 alt={picture.tags}
//                 key={picture.id}
//                 click={this.toggleModal}
//               />
//             ))}
//           </ul>
//           <ButtonLoadMore
//             name={this.props.name}
//             onLoadMore={this.getMorePictures}
//           />
//         </div>
//       )}
//     </div>
//   );
// }

// export default add;
