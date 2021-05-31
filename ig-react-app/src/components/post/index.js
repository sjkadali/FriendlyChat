import Image from './image';

export default function Post({content}) {
    return (
        <div>
            {content.docId} {content.caption}
            <Image src={content.imageSrc} />
        </div>
    )
}
