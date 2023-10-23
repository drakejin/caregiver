import type {
  InferGetStaticPropsType,
  GetStaticProps,
  GetStaticPaths,
} from 'next'


type Repo = {
  id: string
}

export const getStaticPaths = (async () => {
  return {
    paths: [
      { params: { id: '1'} },
      { params: { id: '2'} },
      { params: { id: '3'} },
      { params: { id: '4'} },
      { params: { id: '5'} },
      { params: { id: '6'} },
      { params: { id: '7'} },
      { params: { id: '8'} },
      { params: { id: '9'} },
    ],
    fallback: 'blocking', // false or "blocking"
    // true => getStaticProps에 값이 아무것도 안간 페이지가 추가됨
    // false => getStaticProps에 값이 아무것도 안간 페이지가 추가되지 않음
    // blocking =>
  }
}) satisfies GetStaticPaths

export const getStaticProps = (async (context) => {
  return { props: { repo: { id: context.params?.id as string || '' } } }
}) satisfies GetStaticProps<{
  repo: Repo
}>


export default function Page({ repo }: InferGetStaticPropsType<typeof getStaticProps>) {
  if (!repo) {
    return (
      // fallback true를 하면 props에 값이 아무것도 안들어오게 한다.
      <div>
        <h1> fallback이 와버렸다! </h1>
      </div>
    )
  }
  return (
    <div>
      <h1> 와우 친구들! {repo.id} </h1>
    </div>
  )
}