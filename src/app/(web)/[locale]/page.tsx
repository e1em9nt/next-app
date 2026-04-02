import { type NextPage } from 'next'

import { HomeModule } from '@/app/modules/home'

// interface
interface IProps {}

// component
const Page: NextPage<Readonly<IProps>> = () => {
  // return
  return <HomeModule />
}

export default Page
