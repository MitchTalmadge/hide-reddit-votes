const hidePostVoteButtons = () => {
    const shredditPosts = document.querySelectorAll('shreddit-post');
    shredditPosts.forEach(post => {
        const shadowRoot = post.shadowRoot;
        if (shadowRoot) {
            const voteElements = shadowRoot.querySelectorAll('[data-post-click-location="vote"]');
            voteElements.forEach(element => {
                const parentElement = element.parentElement;
                if (parentElement) {
                    parentElement.style.display = 'none';
                }
            });
        }
    });
};

const hideCommentVoteButtons = () => {
    const shredditComments = document.querySelectorAll('shreddit-comment-action-row');
    shredditComments.forEach(comment => {
        const shadowRoot = comment.shadowRoot;
        if (shadowRoot) {
            const voteButtonSpan = shadowRoot.querySelector('span[slot="vote-button"]');
            if (voteButtonSpan) {
                voteButtonSpan.style.display = 'none';
            }
        }
    });
};

const hideAllVoteButtons = () => {
    hidePostVoteButtons();
    hideCommentVoteButtons();
};

hideAllVoteButtons();

const observer = new MutationObserver(hideAllVoteButtons);
observer.observe(document.body, { childList: true, subtree: true });
