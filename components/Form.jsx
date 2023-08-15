import Link from 'next/link';

const Form = ({
    type,
    post,
    setPost,
    submitting,
    handleSubmit,
}) => {
    return (
        <section className="w-full max-w-full flex-start flex-col">
            <h1 className="head_text text-left">
                <span className="blue_gradient">{type} Post</span>
            </h1>
            <p className="desc text-left max-w-md">
                {type} and share amazing prompts with the world, and let your imagination run wild with any AI-Powered platform.
            </p>
            <form
                onSubmit={handleSubmit}
                className="mt-10 w-full max-2-2xl-flex-flex-col gap-7 glassmorphism"
            >
                <label htmlFor="">
                    <span className="font-satoshi ffont-semibold text-base text-gray-700">
                        Your AI Prompt
                    </span>
                    <textarea
                        name="prompt"
                        id="prompt"
                        value={post.prompt}
                        onChange={(e) => setPost({...post, prompt: e.target.value})}
                        placeholder="Write your prompt here..."
                        retquired
                        className="form_textarea"
                    />
                </label>

                <label htmlFor="">
                    <span className="font-satoshi ffont-semibold text-base text-gray-700">
                        {`Tag `}
                        <span>(#webProgramming, #ideas, #product)</span>
                    </span>
                    <input
                        name="tag"
                        id="tag"
                        value={post.tag}
                        onChange={(e) => setPost({...post, tag: e.target.value})}
                        placeholder="#tag"
                        retquired
                        className="form_input"
                    />
                </label>
                <div className="mt-10 flex-end mx-3 mb-5 gap-4">
                    <Link href="/" className="text-gray-500 text-sm">
                        Cancel
                    </Link>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="px-5 py-1.5 text-sm bg-primary-orange rounded-full text-white"
                    >
                        {submitting ? `${type}...` : type}
                    </button>
                </div>
            </form>
        </section>
    )
}

export default Form
