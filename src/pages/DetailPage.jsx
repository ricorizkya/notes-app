import React from 'react';
import { withRouter } from 'react-router-dom';
import { showFormattedDate } from '../utils';
import { IoArchiveOutline, IoTrashBinOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { getNote } from '../utils/local-data';

// class DetailPage extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       note: null,
//     };
//   }

//   componentDidMount() {
//     const { id } = this.props.match.params;
//     const fetchNote = this.getNote(id);
//     this.setState({ note: fetchNote });
//   }

//   render() {
//     const { note } = this.state;
//     if (!note) {
//       return <p>Catatan tidak ditemukan</p>;
//     }

//     return (
//       <div className='app-container'>
//         <div className='detail-page'>
//           <h1 className='detail-page__title'>{note.title}</h1>
//           <span className='detail-page__createdAt'>
//             {showFormattedDate(note.createdAt)}
//           </span>
//           <p className='detail-page__body'>{note.body}</p>
//         </div>
//         {/* <Link to='/'> */}
//         <div className='action'>
//           <IoTrashBinOutline />
//         </div>
//         {/* </Link> */}
//         {/* <Link to='/'> */}
//         <div className='action2'>
//           <IoArchiveOutline />
//         </div>
//         {/* </Link> */}
//       </div>
//     );
//   }
// }

function DetailPage() {
  const { id } = useParams();
  const [note, setNote] = useState(null);

  useEffect(() => {
    const fetchedNote = getNote(id);
    setNote(fetchedNote);
  }, [id]);

  if (!note) {
    return <p>Loading...</p>;
  }

  return (
    <div className='app-container'>
      <div className='detail-page'>
        <h1 className='detail-page__title'>{note.title}</h1>
        <span className='detail-page__createdAt'>{note.createdAt}</span>
        <p className='detail-page__body'>{note.body}</p>
      </div>
    </div>
  );
}

// export default withRouter(DetailPage);
export default DetailPage;
