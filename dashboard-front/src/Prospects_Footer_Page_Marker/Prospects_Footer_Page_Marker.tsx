import './Prospects_Footer_Page_Marker.css'

type Prop = {
	data: number
}

function Prospects_Footer_Page_Marker({ data }: Prop) {
const pageNumber = Math.ceil(data / 15);
  const pages = Array.from({ length: pageNumber }, (_, i) => i + 1);
  return (
    <div className='prospects__table__footer__page__number__marker'>
		{
			pages.map((page, index) => {
				return <a key={index} href={`page-${page}`}>{page}</a>
			})
		}
	</div>
  )
}

export { Prospects_Footer_Page_Marker }
