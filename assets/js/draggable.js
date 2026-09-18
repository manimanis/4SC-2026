class ExerciceOrderItems {
  static counter = 0;

  constructor(exNode) {
    ExerciceOrderItems.counter++;
    this.exNode = exNode;
    this.id = `order-items-exercise_${ExerciceOrderItems.counter}`;
    this.num_id = ExerciceOrderItems.counter;
    this.itemsOrder = [];
    this.is_verified = false;
    this.is_numbered = exNode.dataset.isnumbered.toLowerCase() === 'true';
    this.buildUI();
    this.placeDefaults();
  }

  buildUI() {
    const exercice = document.createDocumentFragment();
    const exerciceDiv = $('<div>')
      .addClass('ordered-items-exercise')
      .attr('id', this.id);
    const exDiv = exerciceDiv[0];

    // drag n drop handlers
    exDiv.addEventListener('dragstart', e => {
      if (e.target.classList.contains('draggable-item')) {
        e.dataTransfer.setData("Text", e.target.id);
      }
    });
    exDiv.addEventListener('dragover', e => { e.preventDefault(); });
    exDiv.addEventListener('drop', e => {
      e.preventDefault();
      const target = $(e.target);
      const parentDropTarget = target.closest('.drop-target');
      if (parentDropTarget) {
        if (parentDropTarget.hasClass('list-group-item')) {
          if (parentDropTarget[0].childNodes.length > 0) {
            parentDropTarget[0].childNodes.forEach(node => {
              $(node)
                .appendTo(choix_div);
              this.refreshButtons();
            });
          }
        }
        if (parentDropTarget[0].childNodes.length >= +parentDropTarget.data('slots')) {
          return;
        }
        const data = e.dataTransfer.getData("Text");
        if (data.substr(0, data.lastIndexOf('_')) === `item_${this.num_id}`) {
          $(`#${data}`)
            .appendTo(parentDropTarget);
          this.refreshButtons();
        }
      }
    });

    // énoncé
    $('<p>')
      .text(this.exNode.dataset.enonce)
      .appendTo(exerciceDiv);

    // choix
    const choix_div = $('<div>')
      .addClass('drop-target proposed-items border p-2')
      .appendTo(exerciceDiv);
    this.choix_div = choix_div;

    // élément à ordonner
    const thisObj = this;
    $(this.exNode)
      .find('[data-ordre]')
      .each(function (index) {
        const item = $(this);
        const itemId = `item_${thisObj.num_id}_${index}`;
        const data = {
          id: itemId,
          ordre: +item.data('ordre'),
          place: false
        };
        const place = item.data('place');
        if (typeof place === 'boolean') {
          data.place = place;
        }
        thisObj.itemsOrder.push(data);

        $('<span>')
          .attr('id', itemId)
          .addClass('badge bg-secondary p-2 m-1 draggable-item')
          .text(item.text())
          .prop('draggable', true)
          .appendTo(choix_div);
      });

    const items = this.exNode.querySelectorAll('[data-ordre]');
    choix_div.data('slots', items.length)

    // éléments ordonnées
    const ordered_div = $('<div>')
      .addClass('ordered-items')
      .appendTo(exerciceDiv);
    const ol = $('<ul>')
      .addClass('list-group')
      .appendTo(ordered_div);
    $(this.exNode)
      .find('[data-ordre]')
      .each(function (index) {
        const item = $(this);
        const li = $('<li>')
          .addClass('list-group-item drop-target')
          .data('slot', 1)
          .appendTo(ol);
        if (thisObj.is_numbered) {
          li.addClass('numbered');
        }
      });

    // Boutons
    const btn_div = $('<div>')
      .addClass('my-2 d-print-none')
      .appendTo(exerciceDiv);
    const btnVerify = $('<button>')
      .addClass('btn btn-primary')
      .text('Vérifier')
      .appendTo(btn_div)
      .on('click', e => {
        e.preventDefault();
        thisObj.verify();
      });
    this.btn_verify = btnVerify;

    const btnReset = $('<button>')
      .addClass('btn btn-dark ml-2')
      .text('Reset')
      .appendTo(btn_div)
      .on('click', e => {
        e.preventDefault();
        thisObj.reset();
      });
    this.btn_reset = btnReset;

    this.exNode.parentNode.insertBefore(exDiv, this.exNode.nextSibling);
    this.node = exDiv;
    this.exercice_div = exerciceDiv;
  }

  placeDefaults() {
    const thisObj = this;
    this.itemsOrder.forEach((item, index) => {
      if (item.place) {
        this.place(index, item.ordre - 1);
      }
    });
    this.refreshButtons();
  }

  hasAllItemsPlaced() {
    return this.node.querySelectorAll('.ordered-items ul li span').length === this.itemsOrder.length;
  }

  refreshButtons() {
    this.btn_verify.attr('disabled', this.is_verified || !this.hasAllItemsPlaced());
    this.btn_reset.attr('disabled', !this.is_verified);
  }

  place(index, position) {
    const elem = $(`#item_${this.num_id}_${index}`);
    const container = this.exercice_div
      .find(`.ordered-items .list-group li:eq(${position})`);
    elem.appendTo(container);
  }

  verify() {
    const thisObj = this;
    if (!this.hasAllItemsPlaced()) {
      alert(`Veuillez ordonner tous les éléments avant de vérifier!`);
      return;
    }
    $('.ordered-items ul li span')
      .each(function (index) {
        const span = $(this);
        const ordreObj = thisObj.itemsOrder.find(obj => obj.id === span[0].id);
        span.prop('draggable', false);
        if ((index + 1) === ordreObj.ordre) {
          span
            .removeClass('bg-secondary bg-danger')
            .addClass('bg-success');
        } else {
          span
            .removeClass('bg-secondary', 'bg-success')
            .addClass('bg-danger');
        }
      });
    this.choix_div.css({ display: 'none' });
    this.is_verified = true;
    this.refreshButtons();
  }

  reset() {
    const thisObj = this;
    $('.ordered-items ul li span')
      .each(function () {
        const span = $(this);
        span
          .attr('draggable', true)
          .removeClass('bg-danger bg-success')
          .addClass('bg-secondary')
          .appendTo(thisObj.choix_div);
      });
    this.choix_div.css({ display: 'block' });
    this.is_verified = false;
    this.placeDefaults();
    this.refreshButtons();
  }
}

class BrickExercise {
  static counter = 0;

  constructor(canvas) {
    BrickExercise.counter++;
    const thisObj = this;
    this.num_ex = BrickExercise.counter;
    this.id = `brick-exercise-${this.num_ex}`;
    this.canvas = $(canvas);
    this.blocks = this.canvas
      .find('.brick')
      .each(function (index) {
        const id = `block-${thisObj.num_ex}-${index}`;
        const child = $(this)
          .attr('id', id);
      });
    this.blk_success = this.canvas
      .find('.success')
      .addClass('d-none d-print-block')
      .removeAttr('hidden');
    this.slots_count = this.canvas.data('slots');
    this.structure = this.browseStructure(this.canvas, '.brick');
    this.buildUI();
    this.dragDrop();
    this.scramble();
    this.refreshButtons();
  }

  browseStructure(node, selector) {
    const tree = [];
    const thisObj = this;
    node.children(selector)
      .each(function () {
        const child = $(this);
        const id = child.attr('id');
        tree.push({ [id]: thisObj.browseStructure(child, selector) });
      });
    return tree;
  }

  /**
   * 
   * @param {HTMLNode} node 
   * @param {string} classname 
   */
  filterByClassname(node, classname) {
    let tree = [];
    node.childNodes.forEach(child => {
      if (child.nodeType !== Node.ELEMENT_NODE) {
        return;
      }
      if (child.classList.contains(classname)) {
        const id = child.getAttribute('id');
        tree.push({ [id]: this.filterByClassname(child, classname) });
      } else {
        tree = tree.concat(this.filterByClassname(child, classname));
      }
    });
    return tree;
  }

  buildUI() {
    const thisObj = this;
    this.canvas
      .attr('id', this.id);
    // create a container
    const blk_container = $('<div>')
      .addClass('blk-container d-print-none border drop-target')
      .appendTo(this.canvas);
    this.blk_container = blk_container;
    this.blocks
      .each(function (index) {
        const block = $(this);
        block
          .wrap('<span class="brick-container drop-target"></span>')
          .removeClass('brick')
          .addClass('internal-brick draggable-item badge bg-secondary')
          .attr('draggable', true);
      })
      .appendTo(blk_container);
    // Remove main brick container
    // they are not needed anymore 
    this.canvas
      .children('.brick-container')
      .remove();
    // The container where the user will drop
    const blk_drop = $('<div>')
      .addClass('blk-drop-bricks d-print-none')
      .appendTo(this.canvas);
    this.blk_drop = blk_drop;
    const ul = $('<ul>')
      .addClass('list-group')
      .appendTo(blk_drop);
    // Add drop targets
    for (let i = 0; i < this.slots_count; i++) {
      const li = $('<li>')
        .addClass('list-group-item drop-target numbered')
        .appendTo(ul);
    }
    // Add control buttons
    const blk_control = $('<div>')
      .addClass('blk_control p-2 d-print-none')
      .appendTo(this.canvas);
    this.blk_control = blk_control;
    this.btn_verify = $('<button>')
      .addClass('btn btn-primary')
      .text('Vérifier')
      .appendTo(blk_control)
      .on('click', e => {
        e.preventDefault();
        thisObj.verify();
      });
    this.btn_reset = $('<button>')
      .addClass('btn btn-dark ml-2')
      .text('Reset')
      .appendTo(blk_control)
      .on('click', e => {
        e.preventDefault();
        thisObj.reset();
      });
  }

  scramble() {
    const bricks = this.blk_container
      .find('.internal-brick');
    for (let i = 0; i < bricks.length / 2; i++) {
      const pos = Math.floor(Math.random() * bricks.length);
      $(bricks[i]).insertAfter($(bricks[pos]));
    }
  }

  dragDrop() {
    // drag n drop handlers
    this.canvas[0].addEventListener('dragstart', e => {
      if (e.target.classList.contains('draggable-item')) {
        e.dataTransfer.setData("Text", e.target.id);
      }
    });
    this.canvas[0].addEventListener('dragover', e => {
      e.preventDefault();
      const target = $(e.target);
    });
    this.canvas[0].addEventListener('dragenter', e => {
      e.preventDefault();
      const target = $(e.target);
      const parentDropTarget = target.closest('.drop-target');
      if (parentDropTarget.length) {
        parentDropTarget.addClass('drag-enter');
      }
    });
    this.canvas[0].addEventListener('dragleave', e => {
      e.preventDefault();
      const target = $(e.target);
      const parentDropTarget = target.closest('.drop-target');
      if (parentDropTarget.length) {
        parentDropTarget.removeClass('drag-enter');
      }
    });
    this.canvas[0].addEventListener('drop', e => {
      e.preventDefault();
      const target = $(e.target);
      const parentDropTarget = target.closest('.drop-target');

      if (parentDropTarget.length) {
        parentDropTarget.removeClass('drag-enter');
        if (parentDropTarget[0].childNodes.length > 0) {
          parentDropTarget[0].childNodes.forEach(node => {
            $(node)
              .appendTo(this.blk_container);
          });
          this.refreshButtons();
        }
        const data = e.dataTransfer.getData("Text");
        if (data.substr(0, data.lastIndexOf('-')) === `block-${this.num_ex}`) {
          const elem = $(`#${data}`);
          const parent = elem.parent();
          elem
            .appendTo(parentDropTarget);
          this.refreshButtons();
        }
      }
    });
  }

  sameTree(t1, t2) {
    let isEqual = t1.length === t2.length;
    for (let i = 0; i < Math.min(t1.length, t2.length); i++) {
      const n1 = t1[i];
      const n2 = t2[i];
      Object.keys(n1)
        .forEach(k1 => {
          if (n2[k1]) {
            const same = this.sameTree(n1[k1], n2[k1]);
            isEqual = isEqual && same;
            $(`#${k1}`)
              .removeClass('bg-secondary bg-danger')
              .addClass('bg-success');
          } else {
            isEqual = false;
            Object.keys(n2).forEach(k2 => {
              $(`#${k2}`)
                .removeClass('bg-secondary bg-success')
                .addClass('bg-danger');
            });
          }
        });
    }
    return isEqual;
  }

  hasAllItemsPlaced() {
    return this.blk_container
      .find('.internal-brick').length === 0;
  }

  refreshButtons() {
    const itemsPlaced = this.hasAllItemsPlaced();
    this.btn_verify
      .attr('disabled', !itemsPlaced);
    this.btn_reset
      .attr('disabled', !itemsPlaced);
  }

  verify() {
    const curr_struct = this.filterByClassname(this.blk_drop[0], 'internal-brick');
    const isOK = this.sameTree(this.structure, curr_struct);
    if (isOK) {
      this.blk_drop
        .find('.internal-brick')
        .removeAttr('draggable');
      this.blk_success
        .removeClass('d-none');
      this.blk_container.hide();
      this.blk_control.hide();
      this.blk_drop.hide();
    }
    this.refreshButtons();
  }

  reset() {
    const thisObj = this;
    this.blk_drop
      .find('.internal-brick')
      .each(function () {
        const brick = $(this);
        brick
          .removeClass('bg-success bg-danger')
          .addClass('bg-secondary')
          .attr('draggable', true)
          .appendTo(thisObj.blk_container);
      });
    this.scramble();
    this.refreshButtons();
  }
}

class QcmExercise {
  static counter = 0;
  constructor(node) {
    QcmExercise.counter++;
    this.num_id = QcmExercise.counter;
    this.exercise_id = `qcm-exercise-${this.num_id}`;
    this.node = $(node);
    this.prop_container = this.node.find('.propositions');
    let data_correct = this.node.data('correct') || '1';
    if (data_correct) {
      data_correct = data_correct.toString();
    }
    this.answers = (data_correct || '1')
      .split(',')
      .map(num => +num - 1);
    this.control_type = (this.answers.length == 1) ? 'radio' : 'checkbox';
    this.scrambled = !!this.node.data('scrambled');
    this.number_of_tries = this.node.data('tries') || Number.MAX_SAFE_INTEGER;
    this.buildUI();
    console.log(this.scrambled);
    if (this.scrambled) {
      this.scramble();
    }
  }

  buildUI() {
    this.node
      .attr('id', this.exercise_id);
    this.prop_container
      .addClass('list-group');
    const thisObj = this;
    this.retries_count = $('<div>')
      .addClass("d-print-none")
      .text((this.number_of_tries > 1000000) ? 'Essais illimités' : `${this.number_of_tries} essais restants`)
      .appendTo(this.node);
    this.props = this.prop_container
      .find('li')
      .each(function (index) {
        const li = $(this);
        const li_text = li.html();
        const prop_id = `${thisObj.exercise_id}_${index}`;
        li
          .html('')
          .addClass('list-group-item');
        const prop_div = $('<div>')
          .appendTo(li);
        const control = $('<input>')
          .attr('type', thisObj.control_type)
          .attr('id', prop_id)
          .attr('name', `qcmex_${thisObj.num_id}`)
          .appendTo(prop_div);
        const label = $('<label>')
          .addClass('p-2')
          .attr('for', prop_id)
          .html(li_text)
          .appendTo(prop_div);
      });
    this.blk_control = $('<div>')
      .addClass('p-2 d-print-none')
      .appendTo(this.node);
    this.btn_verify = $('<button>')
      .addClass('btn btn-primary mr-2')
      .text('Vérifier')
      .appendTo(this.blk_control)
      .on('click', (e) => {
        e.preventDefault();
        thisObj.verify();
      });
    this.btn_reset = $('<button>')
      .addClass('btn btn-dark')
      .text('Reset')
      .appendTo(this.blk_control)
      .on('click', (e) => {
        e.preventDefault();
        thisObj.reset();
      })
      .hide();
    this.blk_message = $('<div>')
      .insertBefore(this.blk_control);
  }

  scramble() {
    const li_count = this.props.length;
    for (let i = 0; i < li_count; i++) {
      const pos = Math.floor(Math.random() * li_count);
      $(this.props[i])
        .insertAfter($(this.props[pos]));
    }
  }

  canRetry() {
    return this.number_of_tries > 0;
  }

  hasCheckedItems() {
    return this.props.find(':checked').length > 0;
  }

  verify() {
    if (!this.canRetry()) {
      alert('Vous avez écoulé tous les essais!');
      return;
    }

    if (!this.hasCheckedItems()) {
      alert('Veuillez cocher les bonnes réponses !');
      return;
    }


    this.number_of_tries--;
    let essaisText = 'Essais illimités';
    if (this.number_of_tries == 0) {
      essaisText = 'Aucun essai disponible';
    } else if (this.number_of_tries == 1) {
      essaisText = 'Un seul essai restant';
    } else if (this.number_of_tries < 1000000) {
      essaisText = `${this.number_of_tries} essais restants`;
    }
    this.retries_count
      .text(essaisText);

    let score = 0;
    const user_ans = [];
    const thisObj = this;
    this.props.find(`:${this.control_type}`)
      .each(function () {
        const id = $(this).attr('id');
        const num = +id.substr(id.lastIndexOf('_') + 1);
        const isChecked = $(this).is(':checked');
        const includes = thisObj.answers.includes(num);
        if (isChecked === includes) {
          score += 1;
        }
      });
    this.props.find(`:${this.control_type}`)
      .attr('disabled', true);
    this.btn_verify
      .hide();
    if (this.canRetry()) {
      this.btn_reset
        .show();
    }
    if (score === this.props.length) {
      this.blk_message
        .removeClass('bg-danger')
        .addClass('badge bg-success')
        .text('Bravo, correct!');
    } else {
      this.blk_message
        .removeClass('bg-success')
        .addClass('badge bg-danger')
        .text(`Incorrect, ${score} corrects parmi ${this.props.length}!`);
    }
  }

  reset() {
    if (!this.canRetry()) {
      alert('Vous avez écoulé tous les essais!');
      return;
    }

    this.btn_verify
      .show();
    this.btn_reset
      .hide();
    this.props.find(`:${this.control_type}`)
      .attr('disabled', false)
      .prop('checked', false);
    this.blk_message
      .removeClass('badge bg-success bg-danger')
      .text('');
  }
}

class ExerciceSection {
  constructor(node) {
    this.node = node;
    this.id = node.id;
    this.buildUI();

    this.exerciseInputs = [...node.querySelectorAll('.trace-input, .trace-select, .trace-radio-group, .trace-switch')];
    this.feedback = this.node.querySelector('.trace-feedback');
    this.initSwitches();
  }

  initSwitches() {
    const switches = [...this.node.querySelectorAll('.trace-switch')];
    switches.forEach(sw => {
      const checkbox = sw.tagName === 'INPUT' ? sw : sw.querySelector('input[type="checkbox"]');
      if (!checkbox) return;

      const parentWrapper = checkbox.closest('.form-switch, .trace-switch-wrapper');
      const label = checkbox.parentNode.querySelector('.form-check-label, .switch-label') ||
        (parentWrapper ? parentWrapper.querySelector('.form-check-label, .switch-label') : null);

      const updateLabel = () => {
        if (label) {
          const onText = label.getAttribute('data-on') || checkbox.getAttribute('data-on') || 'Vrai';
          const offText = label.getAttribute('data-off') || checkbox.getAttribute('data-off') || 'Faux';
          const isChecked = checkbox.checked;
          label.textContent = isChecked ? onText : offText;
          label.classList.toggle('text-success', isChecked);
          label.classList.toggle('text-secondary', !isChecked);
          label.classList.toggle('fw-bold', true);
        }
      };

      checkbox.addEventListener('change', updateLabel);
      checkbox.addEventListener('input', updateLabel);
      checkbox.addEventListener('click', () => setTimeout(updateLabel, 0));
      if (label) {
        label.addEventListener('click', () => setTimeout(updateLabel, 0));
      }
      updateLabel();
    });
  }

  buildUI() {
    // Supprimer tous les boutons statiques .check-trace-btn ou conteneurs "Vérifier mes réponses" existants dans la section
    const staticBtns = [...this.node.querySelectorAll('.check-trace-btn')];
    staticBtns.forEach(btn => {
      const parentContainer = btn.closest('.d-flex, .mt-3, .mb-3');
      if (parentContainer && parentContainer !== this.node) {
        parentContainer.remove();
      } else {
        btn.remove();
      }
    });

    const controlDiv = document.createElement("div");
    controlDiv.classList.add("d-print-none", "mt-3", "trace-control-bar");

    const btnDiv = document.createElement("div");
    btnDiv.classList.add("d-flex", "gap-2", "align-items-center");
    controlDiv.appendChild(btnDiv);

    const verifyBtn = document.createElement("button");
    verifyBtn.textContent = "✅ Vérifier";
    verifyBtn.classList.add("btn", "btn-primary");
    verifyBtn.addEventListener("click", () => this.checkTrace());
    btnDiv.appendChild(verifyBtn);

    const resetBtn = document.createElement("button");
    resetBtn.textContent = "🔄 Reset";
    resetBtn.classList.add("btn", "btn-dark");
    resetBtn.addEventListener("click", () => this.reset());
    btnDiv.appendChild(resetBtn);

    const feedbackDiv = document.createElement("div");
    feedbackDiv.classList.add("trace-feedback", "small", "fw-bold", "mt-3");
    controlDiv.appendChild(feedbackDiv);

    this.node.appendChild(controlDiv);
  }

  isValidInput(input) {
    const rawExpected = input.getAttribute('data-answer') || '';
    if (!rawExpected && input.placeholder === '') return false;
    const val = input.value.trim();

    if (!val) {
      return false;
    }

    const normalize = (str) => str.toLowerCase()
      .replace(/["']/g, '')
      .replace(/\s+/g, ' ')
      .trim();
    const compact = (str) => normalize(str).replace(/\s+/g, '');

    const userNorm = normalize(val);
    const userCompact = compact(val);

    const expectedList = rawExpected.split('|').map(ans => ans.trim());

    const isCorrect = expectedList.some(exp => {
      if (!exp) return false;
      const expNorm = normalize(exp);
      const expCompact = compact(exp);
      return userNorm === expNorm ||
        userCompact === expCompact ||
        (expNorm.includes(userNorm) && userNorm.length > 0 && !rawExpected.includes('|'));
    });

    return isCorrect;
  }

  isValidRadioGroup(group) {
    const expected = (group.getAttribute('data-answer') || '').toLowerCase();
    const checked = group.querySelector('.trace-radio:checked');
    if (!checked) {
      return false;
    }
    return checked.value.toLowerCase() === expected;
  }

  isValidSelect(select) {
    const rawExpected = (select.getAttribute('data-answer') || '').toLowerCase().trim();
    const val = select.value.toLowerCase().trim();
    if (!val) return false;
    const expectedList = rawExpected.split('|').map(ans => ans.trim());
    return expectedList.some(exp => exp === val || exp.includes(val) || val.includes(exp));
  }

  isValidSwitch(switchInput) {
    const checkbox = switchInput.tagName === 'INPUT' ? switchInput : switchInput.querySelector('input[type="checkbox"]');
    if (!checkbox) return false;
    const rawExpected = (switchInput.getAttribute('data-answer') || checkbox.getAttribute('data-answer') || '').toLowerCase().trim();
    const isChecked = checkbox.checked;

    const trueValues = ['vrai', 'true', '1', 'on', 'v'];
    const falseValues = ['faux', 'false', '0', 'off', 'f'];

    if (trueValues.includes(rawExpected)) {
      return isChecked === true;
    } else if (falseValues.includes(rawExpected)) {
      return isChecked === false;
    }
    return false;
  }

  resetInputFeedback(input) {
    input.classList.remove('is-valid-answer', 'is-invalid-answer');
    const parentSwitch = input.closest('.form-switch, .trace-switch-wrapper');
    if (parentSwitch) {
      parentSwitch.classList.remove('is-valid-answer', 'is-invalid-answer');
    }
  }

  setInputFeedback(input, isCorrect) {
    const parentSwitch = input.closest('.form-switch, .trace-switch-wrapper');
    const target = parentSwitch || input;

    if (isCorrect) {
      target.classList.add('is-valid-answer');
      target.classList.remove('is-invalid-answer');
    } else {
      target.classList.add('is-invalid-answer');
      target.classList.remove('is-valid-answer');
    }
  }

  isDirectChild(section, element) {
    return !element.closest('.exercise-section') ||
      element.closest('.exercise-section') === section;
  }

  reset() {
    this.exerciseInputs.forEach(inp => {
      if (inp.classList.contains('trace-switch') || inp.type === 'checkbox') {
        const checkbox = inp.tagName === 'INPUT' ? inp : inp.querySelector('input[type="checkbox"]');
        if (checkbox) {
          checkbox.checked = false;
          checkbox.dispatchEvent(new Event('change'));
        }
      } else {
        inp.value = '';
      }
      this.resetInputFeedback(inp);
    });
    if (this.feedback) {
      this.feedback.className = "trace-feedback small fw-bold mt-3";
      this.feedback.textContent = "";
    }
  }

  checkTrace() {
    let correctCount = 0;
    let totalCount = 0;

    this.exerciseInputs.forEach(inp => {
      let isCorrect = false;
      totalCount++;
      this.resetInputFeedback(inp);

      if (inp.classList.contains('trace-input')) {
        isCorrect = this.isValidInput(inp);
      } else if (inp.classList.contains('trace-select')) {
        isCorrect = this.isValidSelect(inp);
      } else if (inp.classList.contains('trace-radio-group')) {
        isCorrect = this.isValidRadioGroup(inp);
      } else if (inp.classList.contains('trace-switch') || inp.type === 'checkbox') {
        isCorrect = this.isValidSwitch(inp);
      }

      this.setInputFeedback(inp, isCorrect);
      if (isCorrect) {
        correctCount++;
      }
    });

    if (this.feedback) {
      if (correctCount === totalCount && totalCount > 0) {
        this.feedback.className = "trace-feedback small fw-bold text-success";
        this.feedback.textContent = `🎉 Bravo ! Toutes les réponses sont correctes.`;
      } else {
        this.feedback.className = "trace-feedback small fw-bold text-danger";
        this.feedback.textContent = `⚠️ ${correctCount} / ${totalCount} réponses correctes. Réessayez !`;
      }
    }
  }

}

class AlgorithmeTroue {
  static counter = 0;

  constructor(node) {
    AlgorithmeTroue.counter++;
    this.node = node;
    this.id = node.id || `algo-troue-${AlgorithmeTroue.counter}`;

    this.draggedId = null;
    this.selectedLabel = null;

    this.buildSolutionCode();
    this.initIndependentDropZone();
    this.initSlots();
    this.formatPseudoCode();
    this.buildLabelsBank();
    this.initElements();
    this.arrangeLayout();
    this.scrambleBanks();
    this.bindEvents();
    this.refreshPlaceholders();
  }

  buildSolutionCode() {
    const preElem = this.node.querySelector('pre');
    if (!preElem) return;

    this.trouePre = preElem;

    // Clone pre element BEFORE missing-code spans are replaced by badges
    const solutionPre = preElem.cloneNode(true);
    solutionPre.className = preElem.className + ' algo-solution-pre';

    // Replace all missing-code spans inside clone with their target answers
    const missingSpans = [...solutionPre.querySelectorAll('.missing-code')];
    missingSpans.forEach(span => {
      const targetVal = span.getAttribute('data-target') || span.getAttribute('data-answer') || '';
      const txtNode = document.createTextNode(targetVal);
      if (span.parentNode) {
        span.parentNode.replaceChild(txtNode, span);
      }
    });

    // Apply syntax highlighting on solution code
    const codeNode = solutionPre.querySelector('code');
    if (codeNode) {
      this.highlightTextNodes(codeNode);
    }

    // Build solution wrapper container (hidden initially)
    const solutionBlock = document.createElement('div');
    solutionBlock.className = 'solution-block my-3 d-none';
    solutionBlock.appendChild(solutionPre);
    this.solutionBlock = solutionBlock;

    if (preElem.nextSibling) {
      preElem.parentNode.insertBefore(solutionBlock, preElem.nextSibling);
    } else {
      preElem.parentNode.appendChild(solutionBlock);
    }
  }

  arrangeLayout() {
    const cardBody = this.node.classList.contains('card-body')
      ? this.node
      : (this.node.querySelector(':scope > .card-body') || this.node);

    const labelsBank = this.node.querySelector('.labels-bank');
    const labelsBankGroup = labelsBank ? (labelsBank.closest('.mb-3, .mb-2') || labelsBank) : null;
    const dropZone = this.node.querySelector('.missing-slots-container, .independent-drop-zone');
    const controlsBar = this.node.querySelector('.controls-bar, .algo-controls');

    if (labelsBankGroup) cardBody.appendChild(labelsBankGroup);
    if (dropZone) cardBody.appendChild(dropZone);
    if (controlsBar) cardBody.appendChild(controlsBar);
  }

  initIndependentDropZone() {
    this.refSpans = [];
    let container = this.node.querySelector('.missing-slots-container, .independent-drop-zone');
    const codeMissingSpans = [...this.node.querySelectorAll('pre code .missing-code')];

    if (codeMissingSpans.length > 0) {
      if (!container) {
        container = document.createElement('div');
        container.className = 'missing-slots-container my-3 p-3 bg-white border rounded shadow-sm';
        const cardBody = this.node.classList.contains('card-body')
          ? this.node
          : (this.node.querySelector(':scope > .card-body') || this.node);
        cardBody.appendChild(container);
      }

      container.innerHTML = `
        <div class="fw-bold mb-2 text-dark small">🎯 Zone de dépôt pour compléter l'algorithme :</div>
        <div class="d-flex flex-wrap gap-3 align-items-center slots-wrapper"></div>
      `;

      const wrapper = container.querySelector('.slots-wrapper');

      codeMissingSpans.forEach((span, index) => {
        const slotNum = span.textContent.trim() || `(${index + 1})`;
        const targetVal = span.getAttribute('data-target') || span.getAttribute('data-answer') || '';
        const slotId = span.id || `${this.id}-slot-${index + 1}`;

        // Create independent drop slot box
        const slotBox = document.createElement('div');
        slotBox.className = 'd-flex align-items-center gap-2 p-2 bg-light border rounded shadow-sm';
        slotBox.innerHTML = `
          <span class="fw-bold text-primary fs-6">${slotNum}</span>
          <span class="drop-slot border border-2 border-info rounded bg-white text-dark px-2 py-1 d-inline-flex align-items-center justify-content-center"
            style="min-width: 120px; min-height: 40px; vertical-align: middle;"
            data-target="${targetVal}" id="${slotId}">
            <span class="slot-placeholder text-muted small fw-bold">${slotNum}</span>
          </span>
        `;
        wrapper.appendChild(slotBox);

        // Replace missing span inside code with a badge indicator
        const refSpan = document.createElement('span');
        refSpan.className = 'algo-ref-badge badge bg-warning text-dark mx-1 fw-bold border border-warning';
        refSpan.setAttribute('data-num', slotNum);
        refSpan.setAttribute('data-target', targetVal);
        refSpan.textContent = slotNum;
        span.parentNode.replaceChild(refSpan, span);
        this.refSpans.push(refSpan);
      });
    }
  }

  formatPseudoCode() {
    const codeNode = this.node.querySelector('pre code');
    if (!codeNode) return;

    this.highlightTextNodes(codeNode);
  }

  highlightTextNodes(node) {
    const childNodes = [...node.childNodes];
    childNodes.forEach(child => {
      if (child.nodeType === Node.TEXT_NODE) {
        let text = child.nodeValue;
        if (!text || !text.trim()) return;

        text = text.replace(/\bAlgorithme\s+([A-Za-z0-9_]+)/g, '<span class="text-warning fw-bold">Algorithme</span> <span class="text-info fw-bold">$1</span>');
        text = text.replace(/\bFin\s+Si\b/gi, '<span class="text-warning fw-bold">Fin Si</span>');
        text = text.replace(/\bFin\s+Pour\b/gi, '<span class="text-warning fw-bold">Fin Pour</span>');
        text = text.replace(/\bFin\s+Tant\s*Que\b/gi, '<span class="text-warning fw-bold">Fin Tant Que</span>');
        text = text.replace(/\bTant\s*Que\b/gi, '<span class="text-warning fw-bold">Tant Que</span>');

        const singleKeywords = ['Début', 'Fin', 'Pour', 'de', 'à', 'pas', 'Faire', 'Si', 'Alors', 'Sinon', 'Répéter', "Jusqu'à", 'Ecrire', 'Écrire', 'Lire'];
        singleKeywords.forEach(kw => {
          const regex = new RegExp(`(?<=^|\\s|[()=;,+\\-]|&larr;)${kw.replace("'", "\\'")}(?=$|\\s|[()=;,+\\-]|&larr;)`, 'gi');
          text = text.replace(regex, `<span class="text-warning fw-bold">${kw}</span>`);
        });

        const tempSpan = document.createElement('span');
        tempSpan.innerHTML = text;
        while (tempSpan.firstChild) {
          node.insertBefore(tempSpan.firstChild, child);
        }
        node.removeChild(child);
      } else if (child.nodeType === Node.ELEMENT_NODE && !child.classList.contains('missing-code') && !child.classList.contains('drop-slot') && !child.classList.contains('badge')) {
        this.highlightTextNodes(child);
      }
    });
  }

  initSlots() {
    this.slots = [...this.node.querySelectorAll('.missing-code, .drop-slot')];
    this.slots.forEach((slot, index) => {
      slot.classList.add(
        'missing-code',
        'drop-slot',
        'border',
        'border-2',
        'border-info',
        'rounded',
        'bg-light',
        'text-dark',
        'px-2',
        'py-1',
        'mx-1',
        'd-inline-flex',
        'align-items-center',
        'justify-content-center'
      );
      if (!slot.style.verticalAlign) {
        slot.style.verticalAlign = 'middle';
      }

      if (!slot.querySelector('.slot-placeholder')) {
        const placeholderText = slot.textContent.trim() || `(${index + 1})`;
        slot.innerHTML = `<span class="slot-placeholder text-muted small fw-bold">${placeholderText}</span>`;
      }
    });
  }

  buildLabelsBank() {
    this.banks = [...this.node.querySelectorAll('.labels-bank')];
    if (this.banks.length === 0) return;

    this.banks.forEach(bank => {
      // Collect hardcoded labels if present, or extract from target answers & distractors
      const existingItems = [...bank.querySelectorAll('.draggable-item')];
      if (existingItems.length > 0) return; // Keep existing if hardcoded in HTML

      const correctValues = this.slots.map(slot =>
        slot.getAttribute('data-target') || slot.getAttribute('data-answer')
      ).filter(Boolean);

      let distractors = [];
      const distStr = bank.getAttribute('data-distractors') ||
        bank.getAttribute('data-intrus') ||
        this.node.getAttribute('data-distractors') ||
        this.node.getAttribute('data-intrus') || '';

      if (distStr) {
        distractors = distStr.split('|').map(s => s.trim()).filter(Boolean);
      }

      this.slots.forEach(slot => {
        const slotDist = slot.getAttribute('data-distractors') || slot.getAttribute('data-intrus');
        if (slotDist) {
          distractors = distractors.concat(slotDist.split('|').map(s => s.trim()).filter(Boolean));
        }
      });

      const allValues = [...correctValues, ...distractors];
      bank.innerHTML = '';

      allValues.forEach((val, idx) => {
        const item = document.createElement('span');
        item.className = 'badge bg-primary p-2 fs-6 draggable-item';
        item.style.cursor = 'grab';
        item.setAttribute('draggable', 'true');
        item.setAttribute('data-val', val);
        if (bank.id) {
          item.setAttribute('data-bank', bank.id);
        }
        const cardAlg = this.node.getAttribute('data-alg') || bank.getAttribute('data-alg');
        if (cardAlg) {
          item.setAttribute('data-alg', cardAlg);
        }
        item.textContent = val;
        bank.appendChild(item);
      });
    });
  }

  buildControls() {
    let controlsBar = this.node.querySelector('.controls-bar, .algo-controls');

    this.btnVerify = this.node.querySelector('.btn-verify') ||
      this.node.querySelector('[id^="btn-verify"]');
    this.btnReset = this.node.querySelector('.btn-reset') ||
      this.node.querySelector('[id^="btn-reset"]');
    this.feedback = this.node.querySelector('.algo-feedback, .feedback') ||
      this.node.querySelector('[id^="feedback"]');

    if (!this.btnVerify || !this.btnReset || !this.feedback) {
      if (!controlsBar) {
        controlsBar = document.createElement('div');
        controlsBar.className = 'controls-bar mt-3 d-flex align-items-center gap-2 flex-wrap';

        const solutionElem = this.node.querySelector('.solution-block, .algo-solution, [id^="solution"]');
        if (solutionElem) {
          solutionElem.parentNode.insertBefore(controlsBar, solutionElem);
        } else {
          const cardBody = this.node.querySelector('.card-body') || this.node;
          cardBody.appendChild(controlsBar);
        }
      }

      if (!this.btnVerify) {
        const btnVerify = document.createElement('button');
        btnVerify.className = 'btn btn-sm btn-primary rounded-pill px-3 btn-verify';
        btnVerify.textContent = "Vérifier";
        controlsBar.appendChild(btnVerify);
        this.btnVerify = btnVerify;
      }

      if (!this.btnReset) {
        const btnReset = document.createElement('button');
        btnReset.className = 'btn btn-sm btn-outline-secondary rounded-pill px-3 btn-reset';
        btnReset.textContent = "Réinitialiser";
        controlsBar.appendChild(btnReset);
        this.btnReset = btnReset;
      }

      if (!this.feedback) {
        const feedback = document.createElement('span');
        feedback.className = 'algo-feedback fs-6 fw-bold';
        controlsBar.appendChild(feedback);
        this.feedback = feedback;
      }
    }
  }

  initElements() {
    this.banks = [...this.node.querySelectorAll('.labels-bank')];
    this.slots = [...this.node.querySelectorAll('.missing-code, .drop-slot')];
    this.labels = [...this.node.querySelectorAll('.draggable-item')];

    this.buildControls();

    this.solution = this.node.querySelector('.solution-block, .algo-solution') ||
      this.node.querySelector('[id^="solution"]');
  }

  scrambleBanks() {
    this.banks.forEach(bank => {
      const items = Array.from(bank.children).filter(child => child.classList.contains('draggable-item'));
      for (let i = items.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        bank.appendChild(items[j]);
      }
    });
  }

  updateRefSpans() {
    if (!this.refSpans || this.refSpans.length === 0) return;

    this.slots.forEach((slot, index) => {
      const refSpan = this.refSpans[index];
      if (!refSpan) return;

      const slotNum = refSpan.getAttribute('data-num') || `(${index + 1})`;
      const placedItem = slot.querySelector('.draggable-item');

      if (placedItem) {
        const val = placedItem.getAttribute('data-val') || placedItem.textContent.trim();
        let textClass = 'text-info';
        let bgClass = 'bg-dark';
        let borderClass = 'border-info';

        if (slot.classList.contains('border-success')) {
          textClass = 'text-success';
          borderClass = 'border-success';
        } else if (slot.classList.contains('border-danger')) {
          textClass = 'text-danger';
          borderClass = 'border-danger';
        }

        refSpan.innerHTML = `<span class="${textClass} fw-bold px-1 py-0 rounded ${bgClass} border ${borderClass}">${val}</span>`;
      } else {
        refSpan.innerHTML = `<span class="badge bg-warning text-dark fw-bold border border-warning">${slotNum}</span>`;
      }
    });
  }

  refreshPlaceholders() {
    this.slots.forEach(slot => {
      const ph = slot.querySelector('.slot-placeholder');
      const hasDraggable = slot.querySelector('.draggable-item');
      if (ph) {
        ph.style.display = hasDraggable ? 'none' : 'inline-block';
      }
    });
    this.updateRefSpans();
  }

  bindEvents() {
    const thisObj = this;

    this.labels.forEach((item, index) => {
      if (!item.id) {
        item.id = `${thisObj.id}-lbl-${index}`;
      }

      item.addEventListener('dragstart', e => {
        thisObj.draggedId = item.id;
        e.dataTransfer.setData('text/plain', item.id);
        e.dataTransfer.effectAllowed = 'move';
      });

      item.addEventListener('click', e => {
        e.stopPropagation();
        const parentSlot = item.closest('.drop-slot, .missing-code');
        if (parentSlot) {
          const bankId = item.getAttribute('data-bank');
          const bank = bankId ? thisObj.node.querySelector(`#${bankId}`) || document.getElementById(bankId) : null;
          const targetBank = bank || thisObj.banks[0];
          if (targetBank) targetBank.appendChild(item);
          if (thisObj.selectedLabel === item) thisObj.selectedLabel = null;
          thisObj.refreshPlaceholders();
          return;
        }

        thisObj.labels.forEach(el => el.classList.remove('border', 'border-3', 'border-warning'));
        if (thisObj.selectedLabel === item) {
          thisObj.selectedLabel = null;
        } else {
          thisObj.selectedLabel = item;
          item.classList.add('border', 'border-3', 'border-warning');
        }
      });
    });

    this.node.addEventListener('dragover', e => {
      const dropTarget = e.target.closest('.drop-slot, .missing-code, .labels-bank');
      if (dropTarget) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        dropTarget.classList.add('bg-warning-subtle');
      }
    });

    this.node.addEventListener('dragleave', e => {
      const dropTarget = e.target.closest('.drop-slot, .missing-code, .labels-bank');
      if (dropTarget) {
        dropTarget.classList.remove('bg-warning-subtle');
      }
    });

    this.node.addEventListener('drop', e => {
      const dropTarget = e.target.closest('.drop-slot, .missing-code, .labels-bank');
      if (!dropTarget) return;

      e.preventDefault();
      dropTarget.classList.remove('bg-warning-subtle');

      const id = e.dataTransfer.getData('text/plain') || thisObj.draggedId;
      const draggedElem = thisObj.node.querySelector(`#${id}`) || document.getElementById(id);
      if (!draggedElem) return;

      if (dropTarget.classList.contains('drop-slot') || dropTarget.classList.contains('missing-code')) {
        const labelAlg = draggedElem.getAttribute('data-alg');
        const slotAlg = dropTarget.getAttribute('data-alg');
        if (labelAlg && slotAlg && labelAlg !== slotAlg) return;

        const existingItem = dropTarget.querySelector('.draggable-item');
        if (existingItem && existingItem !== draggedElem) {
          const bankId = existingItem.getAttribute('data-bank');
          const bank = bankId ? thisObj.node.querySelector(`#${bankId}`) || document.getElementById(bankId) : null;
          const targetBank = bank || thisObj.banks[0];
          if (targetBank) targetBank.appendChild(existingItem);
        }
        dropTarget.appendChild(draggedElem);
      } else if (dropTarget.classList.contains('labels-bank')) {
        const bankId = draggedElem.getAttribute('data-bank');
        if (!bankId || dropTarget.id === bankId || thisObj.banks.includes(dropTarget)) {
          dropTarget.appendChild(draggedElem);
        }
      }

      thisObj.draggedId = null;
      if (thisObj.selectedLabel) {
        thisObj.selectedLabel.classList.remove('border', 'border-3', 'border-warning');
        thisObj.selectedLabel = null;
      }
      thisObj.refreshPlaceholders();
    });

    this.slots.forEach(slot => {
      slot.addEventListener('click', () => {
        if (!thisObj.selectedLabel) return;
        const labelAlg = thisObj.selectedLabel.getAttribute('data-alg');
        const slotAlg = slot.getAttribute('data-alg');
        if (labelAlg && slotAlg && labelAlg !== slotAlg) return;

        const existingItem = slot.querySelector('.draggable-item');
        if (existingItem && existingItem !== thisObj.selectedLabel) {
          const bankId = existingItem.getAttribute('data-bank');
          const bank = bankId ? thisObj.node.querySelector(`#${bankId}`) || document.getElementById(bankId) : null;
          const targetBank = bank || thisObj.banks[0];
          if (targetBank) targetBank.appendChild(existingItem);
        }
        slot.appendChild(thisObj.selectedLabel);
        thisObj.selectedLabel.classList.remove('border', 'border-3', 'border-warning');
        thisObj.selectedLabel = null;
        thisObj.refreshPlaceholders();
      });
    });

    if (this.btnVerify) {
      this.btnVerify.addEventListener('click', e => {
        e.preventDefault();
        thisObj.verify();
      });
    }

    if (this.btnReset) {
      this.btnReset.addEventListener('click', e => {
        e.preventDefault();
        thisObj.reset();
      });
    }
  }

  verify() {
    let correctCount = 0;

    this.slots.forEach(slot => {
      const expected = slot.getAttribute('data-target') || slot.getAttribute('data-answer') || '';
      const placedItem = slot.querySelector('.draggable-item');

      if (placedItem) {
        const placedVal = placedItem.getAttribute('data-val') || placedItem.textContent.trim();
        if (placedVal === expected) {
          correctCount++;
          slot.classList.remove('border-primary', 'border-danger');
          slot.classList.add('border-success', 'bg-success-subtle');
        } else {
          slot.classList.remove('border-primary', 'border-success');
          slot.classList.add('border-danger', 'bg-danger-subtle');
        }
      } else {
        slot.classList.remove('border-success');
        slot.classList.add('border-danger');
      }
    });

    if (this.feedback) {
      if (correctCount === this.slots.length && this.slots.length > 0) {
        this.feedback.className = 'feedback badge bg-success ms-2 fs-6';
        this.feedback.textContent = '🎉 Excellent ! Algorithme parfaitement complété !';

        // Hide troué pseudo-code and show clean solution pseudo-code
        if (this.trouePre) this.trouePre.classList.add('d-none');
        if (this.solutionBlock) this.solutionBlock.classList.remove('d-none');
        this.isSolved = true;
      } else {
        this.feedback.className = 'feedback badge bg-danger ms-2 fs-6';
        this.feedback.textContent = `✗ ${correctCount} / ${this.slots.length} emplacements corrects. Réessayez !`;
        if (this.trouePre) this.trouePre.classList.remove('d-none');
        if (this.solutionBlock) this.solutionBlock.classList.add('d-none');
        this.updateRefSpans();
      }
    } else {
      this.updateRefSpans();
    }
  }

  reset() {
    this.slots.forEach(slot => {
      slot.classList.remove('border-success', 'border-danger', 'bg-success-subtle', 'bg-danger-subtle');
      slot.classList.add('border-primary');
      const placedItem = slot.querySelector('.draggable-item');
      if (placedItem) {
        const bankId = placedItem.getAttribute('data-bank');
        const bank = bankId ? this.node.querySelector(`#${bankId}`) || document.getElementById(bankId) : null;
        const targetBank = bank || this.banks[0];
        if (targetBank) targetBank.appendChild(placedItem);
      }
    });

    if (this.trouePre) this.trouePre.classList.remove('d-none');
    if (this.solutionBlock) this.solutionBlock.classList.add('d-none');
    this.isSolved = false;

    this.refreshPlaceholders();

    if (this.feedback) {
      this.feedback.textContent = '';
      this.feedback.className = 'feedback fs-6 fw-bold';
    }
  }
}

document.querySelectorAll('.order-items-exercise')
  .forEach(item => new ExerciceOrderItems(item));

document.querySelectorAll('.bricks-canvas')
  .forEach(item => new BrickExercise(item));

document.querySelectorAll('.qcm-exercise')
  .forEach(item => new QcmExercise(item));

document.querySelectorAll('.exercise-section')
  .forEach(item => new ExerciceSection(item));

document.querySelectorAll('.algorithme-troue, .algo-troue')
  .forEach(item => new AlgorithmeTroue(item));

