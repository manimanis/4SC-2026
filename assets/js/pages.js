$(() => {
  const curPos = new URL(location.href);
  let sectionNum = -1;
  let articleNum = -1;
  if (curPos.hash.startsWith("#section")) {
    const hs = curPos.hash.split('-');
    articleNum = +hs[1] - 1;
    sectionNum = +hs[2] - 1;
  }

  const aside = $('#aside_navbar');
  const articles = $('main article');
  const articles_count = articles.length;
  const STORAGE_KEY = location.pathname + '#art_obj';
  const localStorageData = JSON.parse(localStorage.getItem(STORAGE_KEY)) || {
    article: null,
    article_index: 0,
    sections: null,
    section: null,
    section_index: 0
  };
  const art_obj = (sectionNum != -1 && articleNum != -1) ? {
    article: null,
    article_index: articleNum,
    sections: null,
    section: null,
    section_index: sectionNum
  } : localStorageData;

  const link_list = $('<ul>')
    .addClass('navbar-nav mr-auto')
    .appendTo(aside);

  // hide all articles
  articles
    .addClass('d-none d-print-block')
    .each((index, art_elem) => {
      const article = $(art_elem);
      const id = `article-${index + 1}`;
      const title = article.find('h2').text();

      // article
      //   .attr('id', id);

      const li = $('<li>')
        .addClass('nav-item dropdown')
        .appendTo(link_list);
      const a_id = `link-${index + 1}`;
      const a = $('<a>')
        .addClass('nav-link dropdown-toggle')
        .attr('href', `#${id}`)
        .attr('id', a_id)
        .attr('role', 'button')
        .attr('data-bs-toggle', 'dropdown')
        .attr('aria-haspopup', 'true')
        .attr('aria-expanded', 'false')
        .text(title)
        .appendTo(li);

      const sections = article.find('section');
      if (sections.length) {
        const sect_list = $('<div>')
          .attr('aria-labelledby', a_id)
          .addClass('dropdown-menu')
          .appendTo(li);
        sections
          .each((section_index, sect_elem) => {
            const section = $(sect_elem);
            const id = `section-${index + 1}-${section_index + 1}`;
            const a_id = `link-${index + 1}-${section_index + 1}`;
            const title = section.find('h3').text().replace(/\s+/g, ' ').trim() || `Page ${section_index + 1}`;
            section
              // .attr('id', id)
              .addClass('d-none d-print-block');

            // Extraction de la difficulté de l'exercice (cercle vert, orange ou rouge)
            let diffLevel = '';
            let diffTitle = '';
            const easyBadge = section.find('.badge-difficulty-easy');
            const mediumBadge = section.find('.badge-difficulty-medium');
            const hardBadge = section.find('.badge-difficulty-hard');

            if (easyBadge.length) {
              diffLevel = 'easy';
              diffTitle = 'Facile';
            } else if (mediumBadge.length) {
              diffLevel = 'medium';
              diffTitle = 'Moyen';
            } else if (hardBadge.length) {
              diffLevel = 'hard';
              diffTitle = 'Difficile';
            }

            const a = $('<a>')
              .attr('href', `#${id}`)
              .attr('id', a_id)
              .addClass('dropdown-item d-flex align-items-center justify-content-between gap-3');

            $('<span>')
              .addClass('dropdown-item-title')
              .text(title)
              .appendTo(a);

            if (diffLevel) {
              $('<span>')
                .addClass(`nav-diff-circle diff-${diffLevel}`)
                .attr('title', diffTitle)
                .attr('aria-label', diffTitle)
                .appendTo(a);
            }

            a.appendTo(sect_list);
          });
      }
    });

  const displayArticle = (index) => {
    if (art_obj.article && art_obj.article.addClass) {
      art_obj.article
        .addClass('d-none');
      $(`a#link-${art_obj.article_index + 1}`)
        .removeClass('active');
      $(`a#link-${art_obj.article_index + 1}-${art_obj.section_index + 1}`)
        .removeClass('active');
    }
    art_obj.article_index = index;
    art_obj.article = articles.eq(index)
      .removeClass('d-none');
    art_obj.sections = art_obj.article.find('section');
    $(`a#link-${index + 1}`)
      .addClass('active');
  };

  const displaySection = (index) => {
    if (art_obj.section && art_obj.section.addClass) {
      art_obj.section
        .addClass('d-none');
      $(`a#link-${art_obj.article_index + 1}-${art_obj.section_index + 1}`)
        .removeClass('active');
    }
    art_obj.section_index = index;
    art_obj.section = art_obj.sections.eq(index)
      .removeClass('d-none');
    $(`a#link-${art_obj.article_index + 1}-${index + 1}`)
      .addClass('active');

    localStorage.setItem(STORAGE_KEY, JSON.stringify({
      article_index: art_obj.article_index,
      section_index: art_obj.section_index
    }));

    updateFloatingButtons();
  };

  // --------------------------------------------------------------------------
  // Mobile Floating Section Navigation (Smartphone Mode)
  // --------------------------------------------------------------------------
  $(`
    <div id="mobile-section-nav" class="mobile-nav-floats d-flex justify-content-between align-items-center d-md-none d-print-none">
      <button id="btn-prev-section" class="btn btn-mobile-nav rounded-pill px-3 py-2" type="button" aria-label="Section précédente">
        <span>⬅️</span> <span class="ms-1">Précédent</span>
      </button>
      <button id="btn-next-section" class="btn btn-mobile-nav rounded-pill px-3 py-2" type="button" aria-label="Section suivante">
        <span class="me-1">Suivant</span> <span>➡️</span>
      </button>
    </div>
  `).appendTo('body');

  function updateFloatingButtons() {
    const isFirstArticle = art_obj.article_index === 0;
    const isFirstSection = art_obj.section_index === 0;
    const isFirstOverall = isFirstArticle && isFirstSection;

    const currentSectionsCount = art_obj.sections ? art_obj.sections.length : 0;
    const isLastArticle = art_obj.article_index === articles_count - 1;
    const isLastSection = currentSectionsCount === 0 || art_obj.section_index >= currentSectionsCount - 1;
    const isLastOverall = isLastArticle && isLastSection;

    $('#btn-prev-section').prop('disabled', isFirstOverall).toggleClass('disabled', isFirstOverall);
    $('#btn-next-section').prop('disabled', isLastOverall).toggleClass('disabled', isLastOverall);
  }

  const goToNextSection = () => {
    const currentSectionsCount = art_obj.sections ? art_obj.sections.length : 0;
    if (art_obj.section_index + 1 < currentSectionsCount) {
      displaySection(art_obj.section_index + 1);
    } else if (art_obj.article_index + 1 < articles_count) {
      displayArticle(art_obj.article_index + 1);
      displaySection(0);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goToPrevSection = () => {
    if (art_obj.section_index - 1 >= 0) {
      displaySection(art_obj.section_index - 1);
    } else if (art_obj.article_index - 1 >= 0) {
      const prevArticleIndex = art_obj.article_index - 1;
      displayArticle(prevArticleIndex);
      const prevSectionsCount = art_obj.sections ? art_obj.sections.length : 0;
      displaySection(prevSectionsCount > 0 ? prevSectionsCount - 1 : 0);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  $('#btn-prev-section').on('click', goToPrevSection);
  $('#btn-next-section').on('click', goToNextSection);

  const linkClickHandler = e => {
    // e.preventDefault();
    const link = $(e.currentTarget);
    const href = link.attr('href');
    const href_parts = href.split('-');
    if (href_parts.length >= 3) {
      displayArticle(+href_parts[1] - 1);
      displaySection(+href_parts[2] - 1);
    }
  };

  const pageLinks = $("a[href^=\"#section\"]")
    .click(linkClickHandler);
  // const links = aside.find('a')
  //   .click(linkClickHandler);
  displayArticle(art_obj.article_index);
  displaySection(art_obj.section_index);
});