import { Authors, allAuthors } from 'contentlayer/generated'
import { MDXLayoutRenderer } from 'pliny/mdx-components'
import AuthorLayout from '@/layouts/AuthorLayout'
import { coreContent } from 'pliny/utils/contentlayer'
import { genPageMetadata } from 'app/seo'

export const metadata = genPageMetadata({ title: 'Members' })

export default function Page() {
  const professor = allAuthors.find((p) => p.slug === 'JungheeLee') as Authors
  const professorContent = coreContent(professor)

  const msStudents = allAuthors.filter((p) => p.slug !== 'JungheeLee') as Authors[]
  // const MinjaeKooContent = coreContent(MinjaeKoo)
  const studentsOrder = [
    'MinjaeKoo',
    'GeunhoKim',
    'ByeongminOh',
    'JaeseongLee',
    'HyunggeunLee',
    'EuisinGee',
    'ByungilKim',
    'SeoyoungLee',
    'DawoonJung',
    'DonghyunJeong',
    'SeongsuKim',
    'JaheunLee',
    'EunsungChoi',
  ]
  const orderedMsStudents = studentsOrder.map((s) => msStudents.find((p) => p.slug === s))
  return (
    <>
      <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14">
        Professor
      </h1>
      <AuthorLayout content={professorContent}>
        <MDXLayoutRenderer code={professor.body.code} />
      </AuthorLayout>

      <h1 className="text-3xl font-extrabold leading-9 tracking-tight text-gray-900 dark:text-gray-100 sm:text-4xl sm:leading-10 md:text-6xl md:leading-14 pt-20">
        MS Students
      </h1>
      {orderedMsStudents &&
        orderedMsStudents.map((studentData) => {
          if (studentData === undefined) return <></>
          const studentDataContent = coreContent(studentData)
          return (
            <AuthorLayout key={studentData.slug} content={studentDataContent}>
              <MDXLayoutRenderer code={studentData.body.code} />
            </AuthorLayout>
          )
        })}
    </>
  )
}
