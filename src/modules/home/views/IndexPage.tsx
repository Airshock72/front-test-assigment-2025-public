import useIndexPage from 'src/modules/home/hooks/useIndexPage.ts'

const IndexPage = () => {

  const {
    metrics,
    campaigns
  } = useIndexPage()

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold mb-4'>Campaign Dashboard</h1>
      <p>Loading data...</p>
    </div>
  )
}

export default IndexPage
