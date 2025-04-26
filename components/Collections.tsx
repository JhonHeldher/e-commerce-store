import { getCollections } from '@/lib/actions/actions'
import Image from 'next/image'
import Link from 'next/link'

const Collections = async () => {
    const collections = await getCollections()

    return (
        <div className='flex flex-col items-center gap-10 py-8 px-5'>
            <span className="text-2xl font-bold">Collections</span>
            {!collections || collections.length === 0 ? (
                <span className='text-2xl font-bold'>No collections found</span>
            ) : (
                <div className='flex items-center justify-center gap-8'>
                    {
                        collections.map((collection: CollectionType) => (
                            <Link
                                key={collection._id}
                                href={`/collections/${collection._id}`}
                            >
                                <Image
                                    src={collection.image}
                                    alt={collection.title}
                                    width={350}
                                    height={200}
                                    className='cursor-pointer rounded-lg'
                                />
                                {/* {collection.title} */}
                            </Link>
                        ))
                    }
                </div>
            )}
        </div>
    )
}

export default Collections
