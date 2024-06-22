const hideElements = (hideButtons, hideCounts) => {
    const postsAndComments = document.querySelectorAll('shreddit-post, shreddit-comment-action-row');
    postsAndComments.forEach(post => {
        const shadowRoot = post.shadowRoot;
        if (shadowRoot) {
            const upvoteButton = shadowRoot.querySelectorAll('button[upvote]')[0];
            const downvoteButton = shadowRoot.querySelectorAll('button[downvote]')[0];
            const votePill = upvoteButton.parentElement;

            let voteCountSpan = shadowRoot.querySelectorAll('button[upvote] + span')[0];
            if(!voteCountSpan) {
                let sibling = upvoteButton.nextSibling;
                while (sibling) {
                    if (sibling.nodeType === 3 && sibling.nodeValue.trim() === 'Vote') { // 3 is the nodeType for text nodes
                        voteCountSpan = document.createElement('span');
                        voteCountSpan.textContent = sibling.nodeValue;
                        sibling.replaceWith(voteCountSpan);
                        break;
                    }
                    sibling = sibling.nextSibling;
                }
            }

            if (hideButtons) {
                upvoteButton.style.display = 'none';
                downvoteButton.style.display = 'none';
                if(!hideCounts) {
                    voteCountSpan.style.padding = '0 1rem';
                    voteCountSpan.style.lineHeight = 'var(--size-button-sm-h)';
                }
            }
            if (hideCounts)
                voteCountSpan.style.display = 'none';
            if (hideButtons && hideCounts)
                votePill.style.display = 'none';
        }
    });
};

const applyHiding = () => {
    chrome.storage.sync.get('option', data => {
        switch(data.option) {
            case 'hide-vote-counts':
                hideElements(false, true);
                break;
            case 'hide-buttons':
                hideElements(true, false);
                break;
            case 'hide-all':
            default:
                hideElements(true, true);
                break;
        }
    });
};

applyHiding();

const observer = new MutationObserver(applyHiding);
observer.observe(document.body, { childList: true, subtree: true });
